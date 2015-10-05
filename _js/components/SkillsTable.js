class SkillsTable extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            "categories" : this.getCategories()
        };
        this.updateVisibleCategories = this.updateVisibleCategories.bind(this);
    }

    getCategories()
    {
        return this.props.skills.reduce(function(categoriesMap, skillset) {
            categoriesMap.set(skillset.category, true);
            return categoriesMap;
        }, new Map());
    }

    getVisibleCategories()
    {
        var visibleCategories = [];
        this.state.categories.forEach(function(isVisible, category){
            if(isVisible) {
                visibleCategories.push(category);
            }
        });
        return visibleCategories;
    }

    updateVisibleCategories(event)
    {
        var newState = !this.state.categories.get(event.target.value);
        this.state.categories.set(event.target.value, newState);
        this.setState({
            'categories' : this.state.categories
        });
    }

    render()
    {
        var controls = this.renderControls();
        var rows = this.renderRows();
        return (
            <div id="skills-wrapper">
                <div className="btn-group" onClick={this.updateVisibleCategories}>
                    {controls}
                </div>
                <table id="resume-skills" className="table table-striped table-condensed table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Category</th>
                            <th>Years Exp.</th>
                            <th>Expertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    renderControls()
    {
        var controls = [];
        this.state.categories.forEach(function(isVisible, category) {
            var activeClass = isVisible ? 'active' : '';
            controls.push(
                <button className={'btn btn-default ' + activeClass} value={category}>{category}</button>
            );
        });
        return controls;
    }

    renderRows()
    {
        var categories = this.state.categories;
        return this.props.skills.filter(function(skillset) {
            return categories.get(skillset.category);
        }).map(function(skillset) {
            return (
                <tr>
                    <th>{skillset.skill}</th>
                    <td>{skillset.category}</td>
                    <td>{skillset.years}</td>
                    <td>{skillset.proficiency}/10</td>
                </tr>
            );
        });
    }
}

SkillsTable.defaultProps = {
    "skills" : []
};
export default SkillsTable;
