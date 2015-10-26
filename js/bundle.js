(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsResumeJs = require('./components/Resume.js');

var _componentsResumeJs2 = _interopRequireDefault(_componentsResumeJs);

window.InteractiveResume = {
    setup: function setup(dataLocation) {
        var containerId = arguments.length <= 1 || arguments[1] === undefined ? 'resume-container' : arguments[1];

        $.getJSON(dataLocation, function (data) {
            React.render(React.createElement(_componentsResumeJs2['default'], { data: data }), document.getElementById(containerId));
        });
    }
};

},{"./components/Resume.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivitiesChart = (function (_React$Component) {
    _inherits(ActivitiesChart, _React$Component);

    function ActivitiesChart(props) {
        _classCallCheck(this, ActivitiesChart);

        _get(Object.getPrototypeOf(ActivitiesChart.prototype), 'constructor', this).call(this, props);
        this.state = {
            'container_id': this.generateChartId(),
            'data': this.generateChartData()
        };
    }

    _createClass(ActivitiesChart, [{
        key: 'generateChartData',
        value: function generateChartData() {
            var chartData = {
                "values": [],
                "labels": [],
                "colors": this.generateColors(this.props.activities.length)
            };

            this.props.activities.forEach(function (activity) {
                chartData.values.push(activity.hours);
                chartData.labels.push(activity.activity);
            });
            return chartData;
        }
    }, {
        key: 'generateChartId',
        value: function generateChartId() {
            return 'activities_container_' + Math.floor(Math.random() * 100000 + 1);
        }
    }, {
        key: 'generateColors',
        value: function generateColors(colorCount) {
            var labelColor = Raphael.color(this.props.label_color);
            //interpolate
            var increments = {
                "r": parseInt(labelColor.r / 2 / colorCount),
                "g": parseInt(labelColor.g / 2 / colorCount),
                "b": parseInt(labelColor.b / 2 / colorCount)
            };
            var colors = [];
            for (var i = 0; i < colorCount; i++) {
                var r = labelColor.r - increments.r * i;
                var g = labelColor.g - increments.g * i;
                var b = labelColor.b - increments.b * i;
                colors.push('rgb(' + r + ',' + g + ',' + b + ')');
            }
            return colors;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initializeChart();
        }
    }, {
        key: 'initializeChart',
        value: function initializeChart() {
            //Inspired by and borrowing heavily from: http://codepen.io/dshapira/pen/CJind
            //TODO: Re-render the chart on resize
            var $container = $('#' + this.state.container_id),
                backgroundColor = this.props.background_color,
                strokeColor = this.props.stroke_color,
                data = this.state.data;
            var dimensions = this.getChartDimensions($container);
            $container.css('height', dimensions.container.height + 'px');
            var paper = new Raphael($container[0], dimensions.container.width, dimensions.container.height);

            //Render the Pie Chart
            var pie = paper.piechart(dimensions.chart.x, dimensions.chart.y, dimensions.chart.radius, data.values, {
                legend: data.labels,
                legendpos: 'east',
                legendcolor: strokeColor,
                stroke: strokeColor,
                strokewidth: 1,
                colors: data.colors
            });

            //Handle hover in and out
            pie.hover(function () {
                this.sector.stop();
                this.sector.scale(1.1, 1.1, this.cx, this.cy);

                if (this.label) {
                    this.label[0].stop();
                    this.label[0].attr({ r: 8.5 });
                    this.label[1].attr({ "font-weight": 800 });
                    centerLabel.stop();
                    centerLabel.attr('text', ActivitiesChart.getReadableLabel(this.value.value));
                    centerLabel.animate({ 'opacity': 1.0 }, 200);
                }
            }, function () {
                this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
                this.sector.animate({ 'stroke': strokeColor }, 400);
                if (this.label) {
                    this.label[0].attr({ r: 5 });
                    this.label[1].attr({ "font-weight": 400 });
                    centerLabel.stop();
                    centerLabel.animate({ 'opacity': 0.0 }, 500);
                }
            });

            //Render the inner circle that turns the chart from Pie to Donut (delicious)
            paper.circle(dimensions.chart.x, dimensions.chart.y, dimensions.chart.inner_radius).attr({ 'fill': backgroundColor, 'stroke': strokeColor });

            //Render the center label
            var centerLabel = paper.text(dimensions.chart.x, dimensions.chart.y, '').attr({ 'fill': strokeColor, 'font-size': 16, "font-weight": 800, 'opacity': 0.0 });
        }
    }, {
        key: 'getChartDimensions',
        value: function getChartDimensions($container) {
            var baseWidth = parseInt($container.css('width'));
            return {
                'chart': {
                    'x': baseWidth / 3,
                    'y': baseWidth / 4,
                    'radius': baseWidth / 5,
                    'inner_radius': baseWidth / 9
                },
                'container': {
                    'width': baseWidth,
                    'height': baseWidth / 2
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'chart-container', id: this.state.container_id });
        }
    }], [{
        key: 'getReadableLabel',
        value: function getReadableLabel(value) {
            var readableValue = value + ' hours';
            if (value < 1) {
                readableValue = value * 60 + ' minutes';
            } else if (value == 1) {
                readableValue = '1 hour';
            }
            return readableValue;
        }
    }]);

    return ActivitiesChart;
})(React.Component);

ActivitiesChart.defaultProps = {
    "activities": [],
    "background_color": "#FFF",
    "stroke_color": "#000",
    "label_color": "#AAA"
};

exports['default'] = ActivitiesChart;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SkillsTableJs = require('./SkillsTable.js');

var _SkillsTableJs2 = _interopRequireDefault(_SkillsTableJs);

var _ActivitiesChartJs = require('./ActivitiesChart.js');

var _ActivitiesChartJs2 = _interopRequireDefault(_ActivitiesChartJs);

var Resume = (function (_React$Component) {
    _inherits(Resume, _React$Component);

    function Resume(props) {
        _classCallCheck(this, Resume);

        _get(Object.getPrototypeOf(Resume.prototype), 'constructor', this).call(this, props);
        this.state = {
            'activities_by_category': this.groupActivitiesByCategory()
        };
    }

    _createClass(Resume, [{
        key: 'groupActivitiesByCategory',
        value: function groupActivitiesByCategory() {
            var activitiesByCategory = {};
            this.props.data.activities.forEach(function (activity) {
                if (activitiesByCategory[activity.category] == undefined) {
                    activitiesByCategory[activity.category] = [];
                }
                activitiesByCategory[activity.category].push(activity);
            });
            return activitiesByCategory;
        }
    }, {
        key: 'render',
        value: function render() {
            var charts = this.renderActivitiesCharts();
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(
                        'h2',
                        null,
                        'My Average Day'
                    ),
                    charts
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(
                        'h2',
                        null,
                        'Skills'
                    ),
                    React.createElement(_SkillsTableJs2['default'], { skills: this.props.data.skills })
                )
            );
        }
    }, {
        key: 'renderActivitiesCharts',
        value: function renderActivitiesCharts() {
            var charts = [];
            for (var category in this.state.activities_by_category) {
                if (this.state.activities_by_category.hasOwnProperty(category)) {
                    var activities = this.state.activities_by_category[category];
                    var color = this.props.activity_colors[category];
                    charts.push(React.createElement(
                        'div',
                        { className: 'activities-container' },
                        React.createElement(
                            'h3',
                            null,
                            category
                        ),
                        React.createElement(_ActivitiesChartJs2['default'], { activities: activities, label_color: color })
                    ));
                }
            }
            return charts;
        }
    }]);

    return Resume;
})(React.Component);

Resume.defaultProps = {
    'activity_colors': {
        'professional': '#FAA',
        'personal': '#AAF',
        'nocturnal': '#AFA'
    }
};
exports['default'] = Resume;
module.exports = exports['default'];

},{"./ActivitiesChart.js":2,"./SkillsTable.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkillsTable = (function (_React$Component) {
    _inherits(SkillsTable, _React$Component);

    function SkillsTable(props) {
        _classCallCheck(this, SkillsTable);

        _get(Object.getPrototypeOf(SkillsTable.prototype), "constructor", this).call(this, props);
        this.state = {
            "categories": this.getCategories()
        };
        this.updateVisibleCategories = this.updateVisibleCategories.bind(this);
    }

    _createClass(SkillsTable, [{
        key: "getCategories",
        value: function getCategories() {
            return this.props.skills.reduce(function (categoriesMap, skillset) {
                categoriesMap.set(skillset.category, true);
                return categoriesMap;
            }, new Map());
        }
    }, {
        key: "getVisibleCategories",
        value: function getVisibleCategories() {
            var visibleCategories = [];
            this.state.categories.forEach(function (isVisible, category) {
                if (isVisible) {
                    visibleCategories.push(category);
                }
            });
            return visibleCategories;
        }
    }, {
        key: "updateVisibleCategories",
        value: function updateVisibleCategories(event) {
            var newState = !this.state.categories.get(event.target.value);
            this.state.categories.set(event.target.value, newState);
            this.setState({
                'categories': this.state.categories
            });
        }
    }, {
        key: "render",
        value: function render() {
            var controls = this.renderControls();
            var rows = this.renderRows();
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { id: "resume-skills-control", onChange: this.updateVisibleCategories },
                    controls
                ),
                React.createElement(
                    "table",
                    { id: "resume-skills", className: "table table-condensed" },
                    React.createElement(
                        "tbody",
                        null,
                        rows
                    )
                )
            );
        }
    }, {
        key: "renderControls",
        value: function renderControls() {
            var controls = [];
            this.state.categories.forEach(function (isVisible, category) {
                controls.push(React.createElement(
                    "span",
                    { className: 'category-toggle ' + (isVisible ? 'enabled' : 'disabled') },
                    React.createElement("input", { name: "categories", type: "checkbox", id: 'category-toggle-' + category, checked: isVisible ? 'checked' : '', value: category }),
                    React.createElement(
                        "label",
                        { htmlFor: 'category-toggle-' + category },
                        category
                    )
                ));
            });
            return controls;
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var previousCategory = '',
                isNewCategory = false;
            return this.getVisibleSkillsets().map(function (skillset) {
                var rows = [];
                isNewCategory = previousCategory != skillset.category;
                if (isNewCategory) {
                    rows.push(React.createElement(
                        "tr",
                        { className: "category-border" },
                        React.createElement(
                            "th",
                            { colSpan: "2" },
                            skillset.category
                        )
                    ));
                }
                rows.push(React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        skillset.skill,
                        " ",
                        React.createElement(
                            "small",
                            null,
                            "(",
                            skillset.years,
                            " years)"
                        )
                    ),
                    React.createElement(
                        "td",
                        { className: "proficiency-cell" },
                        React.createElement(
                            "span",
                            { className: "proficiency-filled" },
                            String.fromCharCode(8226).repeat(skillset.proficiency)
                        ),
                        React.createElement(
                            "span",
                            { className: "proficiency-empty" },
                            String.fromCharCode(8226).repeat(8 - skillset.proficiency)
                        )
                    )
                ));
                previousCategory = skillset.category;
                return rows;
            });
        }
    }, {
        key: "getVisibleSkillsets",
        value: function getVisibleSkillsets() {
            var categories = this.state.categories;
            return this.props.skills.filter(function (skillset) {
                return categories.get(skillset.category);
            });
        }
    }]);

    return SkillsTable;
})(React.Component);

SkillsTable.defaultProps = {
    "skills": []
};
exports["default"] = SkillsTable;
module.exports = exports["default"];

},{}]},{},[1]);
