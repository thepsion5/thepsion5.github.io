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

},{"./components/Resume.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SkillsTableJs = require('./SkillsTable.js');

var _SkillsTableJs2 = _interopRequireDefault(_SkillsTableJs);

var Resume = (function (_React$Component) {
    _inherits(Resume, _React$Component);

    function Resume() {
        _classCallCheck(this, Resume);

        _get(Object.getPrototypeOf(Resume.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Resume, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(_SkillsTableJs2["default"], { skills: this.props.data.skills })
            );
        }
    }]);

    return Resume;
})(React.Component);

exports["default"] = Resume;
module.exports = exports["default"];

},{"./SkillsTable.js":3}],3:[function(require,module,exports){
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
                { id: "skills-wrapper", className: "col-sm-6" },
                React.createElement(
                    "div",
                    { className: "btn-group", onClick: this.updateVisibleCategories },
                    controls
                ),
                React.createElement(
                    "table",
                    { id: "resume-skills", className: "table table-striped table-condensed table-hover table-bordered" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Skill"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Category"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Years Exp."
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Expertise"
                            )
                        )
                    ),
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
            var categories = this.state.categories;
            return this.props.skills.filter(function (skillset) {
                return categories.get(skillset.category);
            }).map(function (skillset) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        skillset.skill
                    ),
                    React.createElement(
                        "td",
                        null,
                        skillset.category
                    ),
                    React.createElement(
                        "td",
                        null,
                        skillset.years
                    ),
                    React.createElement(
                        "td",
                        null,
                        skillset.proficiency,
                        "/10"
                    )
                );
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
