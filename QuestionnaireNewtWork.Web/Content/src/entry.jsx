import React ,{ Component }from 'react';
import { render } from 'react-dom';

class CommentBox extends Component{
  render(){
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
        Hello,React
      </div>
    );
  }
}

render(
  <CommentBox />,
  document.getElementById('content')
);