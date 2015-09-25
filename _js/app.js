import Resume from './components/Resume.js';

window.interactiveResume = {
    setup: function(data, containerId)
    {
        containerId = containerId || 'resume-container';
        React.render(
            <Resume data={data} />,
            document.getElementById(containerId)
        );
    }
};
