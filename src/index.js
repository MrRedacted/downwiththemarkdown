const projectName = 'Markdown Previewer';

//adjusts links in marked to make sure they open in new tab
const renderer = {
    link(href, title, text) {
        return `<a target="_blank" href="${href}">${text}` + '</a>';
    }
};

//applies the adjusted link
marked.use({ renderer });

//allows carriage returns to be rendered as breaks
marked.setOptions({
    breaks: true,
});


//main stateful component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: placeholder,
        };
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        this.setState({
            render: event.target.value,
        });
    }
  
    render() {
        return (
            <div id="main_wrapper">
                <div id="edit_wrapper" className="editor">
                    <Headbar 
                        icon="far fa-file-code" 
                        headText="Editor" 
                    />
                    <Editor 
                        onChange={this.handleChange}
                        render={this.state.render}
                    />
                </div>
                <div id="preview_wrapper" className="preview">
                    <Headbar
                        icon="far fa-file-alt"
                        headText="Preview"
                    />
                    <Preview
                        render={this.state.render}
                    />
                </div>
            </div>
        );
    }
};

//three non-stateful components
const Editor = (props) => {
    return (
        <textarea 
            id="editor" 
            className="editor" 
            type="text"
            value={props.render}
            onChange={props.onChange}
        />
    );
};

const Preview = (props) => {
    return (
        <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.render)}}></div>
    );
};

const Headbar = (props) => {
    return (
        <div className="headbar">
            <span><i className={props.icon}/> {props.headText}</span>
        </div>
    );
}

const placeholder = 
`# Here you will find a wonderful React Markdown Previewer! (this is a h1 sized header!)

## Below you will find several different examples of how to use this editor! (this is a h2 sized header, note the number of # used to denote what h-number is used)

### Before we start, if you would like to see some of my other projects, check me out at my [CodePen](https://codepen.io/MrRedacted) or at my [GitHub](https://github.com/MrRedacted)!

You make \`<p>inline code</p>\` with backticks!

You can also make multiline code by using three backticks in the beginning and end of your code, like this:

\`\`\`
class App extends React.Componenet {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <span> This is so cool! </span>
        )
    }
}
\`\`\`

> Block Quotes will look like this!

- Lists are super simple as well!
   - Indentation will change your bullet point
1. And you can even number your list items!

**bold** text works like this...
and _italic_ like this...
**_or even both_** like this!
always be sure to ~~correct your mistakes~~


### Images will even work here!
![Microsoft Flight Simulator](https://steamcdn-a.akamaihd.net/steam/apps/1250410/capsule_616x353.jpg?t=1598477928)
`;

ReactDOM.render(<App />, document.getElementById('app'));