(function () {

    angular.module('index.controllers', [])
        .controller("matchCtrl", function ($rootScope, $scope) {
            $scope.initFn = function () {
                for (var i = 1; i < list.length; i++) {
                    if (list[i - 1].startPosition == 360) {
                        list[i - 1].startPosition = 0;
                    }
                    var len = list[i - 1].startPosition + list[i - 1].rotateDeg;
                    if (180 > list[i - 1].startPosition && 180 <= len) {
                        $scope.num = i;
                        console.log($scope.num);
                    }
                }

                //只有两个或者一个的时候
                if (list.length <= 2) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].percent > 0.5) {
                            $scope.num = i + 1;
                        }
                    }
                }
            }

            $scope.num = 1;
            //总资产
            $scope.totalAssets = 0;
            $scope.totalAssets = 100000;
            var list = [
                {"name": "新手专享", "percent": 0.25, "amount": 3000},
                {"name": "泰金宝1", "percent": 0.25, "amount": 7000},
                {"name": "泰金宝2", "percent": 0.25, "amount": 8000},
                {"name": "泰金宝3", "percent": 0.25, "amount": 9000}
            ];
            $scope.propertyMatch = list;
            if (list.length != 0) {
                for (var i in list) {
                    if (i == 0) {
                        list[i].startPosition = 0;//计算起始位置
                    } else {
                        list[i].startPosition = list[i - 1].startPosition + list[i - 1].percent * 360;//计算起始位置
                        if (list[i].startPosition >= 360) {
                            list[i].startPosition = list[i].startPosition - 360;
                        }
                    }
                    list[i].rotateDeg = list[i].percent * 360;//计算旋转度数
                    if (list[i].percent > 0.5) {
                        list[i].className = "gt50";
                    } else {
                        list[i].className = "";
                    }
                    list[i].class_bg = "chart_bg_" + i;
                    list[i].property_font = "property_font_" + i;

                }
                $scope.initFn();
                $scope.propertyMatch = list;
                $scope.isShow = true;
            } else {
                $scope.isShow = false;
                $scope.propertyMatch = list
            }
            //滑动
            var angle = 0;
            var totalAngle = 0;
            touch.on('#chart-loading', 'touchstart', function (ev) {
                ev.startRotate();
                ev.originEvent.preventDefault();
            });
            touch.on('#chart-loading', 'rotate', function (ev) {
                console.log("rotate");
                totalAngle = angle + ev.rotation;
                if (ev.fingerStatus === 'end') {
                    angle = angle + ev.rotation;
                }
                document.getElementById("target").style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
            });

            touch.on('#chart-loading', 'touchend', function (ev) {
                console.log("旋转角度：" + totalAngle);
                var n = totalAngle % 360;
                console.log(n);

                if (n > 0 && n < 180) {         //顺时针
                    n = 180 - n;
                    for (var i = 1; i < list.length; i++) {
                        if (list[i - 1].startPosition == 360) {
                            list[i - 1].startPosition = 0;
                        }
                        if (n > list[i - 1].startPosition && n < list[i].startPosition) {
                            $scope.num = i;
                            console.log("顺时针1第几个：" + $scope.num);
                            $scope.$apply();
                        }
                    }

                } else if (n >= 180) {
                    n = 540 - n;
                    for (var i = 1; i < list.length; i++) {
                        if (list[i - 1].startPosition == 0) {
                            list[i - 1].startPosition = 360;
                        }
                        if (n > list[i - 1].startPosition && n < list[i].startPosition) {
                            $scope.num = i;
                            console.log("顺时针2第几个：" + $scope.num);
                            $scope.$apply();
                        }
                    }
                    //最后一个单独判断
                    if (n > list[list.length - 1].startPosition) {
                        $scope.num = list.length;
                        console.log("顺时针3第几个：" + $scope.num);
                        $scope.$apply();
                    }
                } else {              //逆时针旋转
                    if (n < 0 && n > -180) {
                        n = -n + 180;
                        for (var i = 1; i < list.length; i++) {
                            console.log(list[i - 1].startPosition + "....." + list[i].startPosition)
                            if (list[i - 1].startPosition == 0) {
                                list[i - 1].startPosition = 360;
                            }
                            if (n > list[i - 1].startPosition && n < list[i].startPosition) {
                                $scope.num = i;
                                console.log("逆时针1第几个：" + $scope.num);
                                $scope.$apply();
                            }
                        }
                        //最后一个单独判断
                        if (n > list[list.length - 1].startPosition) {
                            $scope.num = list.length;
                            console.log("逆时针2第几个：" + $scope.num);
                            $scope.$apply();
                        }
                    }
                    if (n < -180) {
                        n = -n - 180;
                        for (var i = 1; i < list.length; i++) {
                            if (list[i - 1].startPosition == 360) {
                                list[i - 1].startPosition = 0;
                            }
                            if (n > list[i - 1].startPosition && n < list[i].startPosition) {
                                $scope.num = i;
                                console.log("逆时针3第几个：" + $scope.num);
                                $scope.$apply();
                            }
                        }
                    }
                }
            });
        })
})();
