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
            <div>
                <form id="resume-skills-control" onChange={this.updateVisibleCategories}>
                    {controls}
                </form>
                <table id="resume-skills" className="table table-condensed">
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
            controls.push(
                <span className={ 'category-toggle ' + (isVisible ? 'enabled' : 'disabled')}>
                    <input name="categories" type="checkbox" id={ 'category-toggle-'+category} checked={ isVisible ? 'checked' : '' } value={category} />
                    <label htmlFor={ 'category-toggle-'+category }>{category}</label>
                </span>
            );
        });
        return controls;
    }

    renderRows()
    {
        var previousCategory = '', isNewCategory = false;
        return this.getVisibleSkillsets().map(function(skillset) {
            var rows = [];
            isNewCategory = (previousCategory != skillset.category);
            if(isNewCategory) {
                rows.push(
                    <tr className="category-border">
                        <th colSpan="2">{skillset.category}</th>
                    </tr>
                );
            }
            rows.push(
                <tr>
                    <th>{skillset.skill} <small>({skillset.years} years)</small></th>
                    <td className="proficiency-cell">
                        <span className="proficiency-filled">{String.fromCharCode(8226).repeat(skillset.proficiency)}</span>
                        <span className="proficiency-empty">{String.fromCharCode(8226).repeat(8-skillset.proficiency)}</span>
                    </td>
                </tr>
            );
            previousCategory = skillset.category;
            return rows;
        });
    }

    getVisibleSkillsets()
    {
        var categories = this.state.categories;
        return this.props.skills.filter(function(skillset) {
            return categories.get(skillset.category);
        });
    }
}

SkillsTable.defaultProps = {
    "skills" : []
};
export default SkillsTable;
