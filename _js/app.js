import Resume from './components/Resume.js';

window.interactiveResume = {
    setup: function()
    {
        var data = {
            'skills' : []
        };
        var containerId = 'resume-container';
        React.render(
            <Resume data={data}>,
            document.findElementById(containerId)
        );
    }
};