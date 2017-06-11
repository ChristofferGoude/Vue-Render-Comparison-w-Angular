function onFullLoad(){
    var app = angular.module("angularApp", []);
    
    app.controller('angularCtrl', ["$scope", function($scope) {
        $scope.listItem     = "<li>hi</li>";
        $scope.listItems    = "<ul>" + $scope.listItem + "</ul>";
        $scope.list         = "<div>" + $scope.listItems + "</div>";

        var items = fillArray($scope.list, 10000);
        var maxCount = 100;   
        
        console.log(items);
        
        testRun((items, done) => {
            document.getElementById("root").innerHTML = items;
            done();
        });
     
        function testRun(example) {
            var count = 0;
            var times = [];
                    
            document.getElementById('results').textContent = 'Running benchmark. This may take a minute...';
            function runExample () {
                var startTime = now();
                example(items, function () {
                    var totalTime = Math.ceil(now() - startTime)
                    console.log(totalTime + 'ms')
                    times.push(totalTime)
                    count += 1
                    if (count < maxCount) {
                        document.getElementById('root').innerHTML = ''
                        runExample()
                    } else {
                        reportResults(times);
                    }
                })
          }
          setTimeout(runExample, 1)
        }  
        
        function generateArray(length, transform) {
          var nullArray = Array.apply(null, { length: length })
          return transform
            ? nullArray.map(transform)
            : nullArray
        }
        
        function fillArray(value, len){
            var arr = [];
            for (var i=0; i < len; i++){
                arr.push(value);
            }
            
            return arr;
        }
        
        function reportResults(times) {
          times = [].concat(times)
          times.sort(function (a, b) { return a - b })
        
          var report = [
            'Fastest: ' + times[0] + 'ms',
            'Median: ' + times[times.length / 2] + 'ms',
            'Average: ' + times.reduce(function (a, b) { return a + b }, 0) / times.length + 'ms',
            '95th Perc.: ' + times[Math.ceil(times.length * 0.95)] + 'ms',
            'Slowest: ' + times[times.length - 1] + 'ms'
          ].join('\n')
        
          console.log(report)
          document.getElementById('results').innerHTML = report.replace(/\n/g, '<br>')
          document.getElementById('root').innerHTML = ''
        }
        
        function now(){
            return performance.now();
        }
    }]);
}