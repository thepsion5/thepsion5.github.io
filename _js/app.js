import Resume from './components/Resume.js';

window.InteractiveResume = {
    setup: function(dataLocation, containerId)
    {
        containerId = containerId || 'resume-container';
        $.getJSON(dataLocation, function(data)
        {
            React.render(
                <Resume data={data} />,
                document.getElementById(containerId)
            );
        });
    }
};
