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
        this.state = {};
    }

    _createClass(ActivitiesChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initializeChart();
        }
    }, {
        key: 'initializeChart',
        value: function initializeChart() {
            console.log(this.props);
            var $container = $(this.props.container);
            var containerHeight = parseInt($container.css('height')),
                containerWidth = parseInt($container.css('width')),
                radius = Math.min(containerWidth, containerHeight) / 3,
                backgroundColor = this.props.background_color,
                data = this.generateChartData();
            //TODO: Actually generate the chart here
        }
    }, {
        key: 'generateChartData',
        value: function generateChartData() {
            var chartData = {
                "values": [],
                "labels": [],
                "colors": []
            };

            this.props.activities.forEach(function (activity) {
                chartData.values.push(activity.hours);
                chartData.labels.push(activity.activity);
                var color = '';
                switch (activity.category) {
                    case 'professional':
                        color = "#99F";break;
                    case 'personal':
                        color = "#F99";break;
                    case 'sleep':
                        color = "#9F9";break;
                }
                chartData.colors.push(color);
            });
            return chartData;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'h3',
                    null,
                    'My Average Day'
                ),
                React.createElement('div', { id: 'activities-chart' })
            );
        }
    }]);

    return ActivitiesChart;
})(React.Component);

ActivitiesChart.defaultProps = {
    "activities": [],
    "container": "#activities-chart",
    "donut_size": 0.5,
    "background_color": "#FFF",
    "colors": ["#AAF", "#AFF", "#FAA"]
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

    function Resume() {
        _classCallCheck(this, Resume);

        _get(Object.getPrototypeOf(Resume.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Resume, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(_ActivitiesChartJs2['default'], { activities: this.props.data.activities }),
                React.createElement(_SkillsTableJs2['default'], { skills: this.props.data.skills })
            );
        }
    }]);

    return Resume;
})(React.Component);

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
                { className: "col-sm-6" },
                React.createElement(
                    "h2",
                    null,
                    "Skills"
                ),
                React.createElement(
                    "div",
                    { id: "resume-skills-control", className: "btn-group", onClick: this.updateVisibleCategories },
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
                var activeClass = isVisible ? 'active' : '';
                controls.push(React.createElement(
                    "button",
                    { className: 'btn btn-default ' + activeClass, value: category },
                    category
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
