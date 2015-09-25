import SkillsTable from './SkillsTable.js';

class Resume extends React.Component
{
    render()
    {
        return (
            <div class="resume">
                <SkillsTable skills={this.skills} />
            </div>
        );
    }

}
export default Resume;
