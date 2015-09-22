class Resume extends React.component
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