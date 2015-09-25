class SkillsTable extends React.Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        var rows = this.renderRows();
        return (
            <table id="resume-skills" className="table table-striped table-condensed table-hover">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Category</th>
                        <th>Years Exp.</th>
                        <th>Expertise</th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }

    renderRows()
    {
        return this.props.skills.map(function(skillset) {
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
