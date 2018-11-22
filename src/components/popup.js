import React from 'react'
import PropTypes from 'prop-types'

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

const Popup = ({ onClick, completed, text, remove }) => (
    <div
        className="popup"
    >
        <span onClick={onClick} dangerouslySetInnerHTML={{__html: urlify(text)}} style={{display: 'inline-block', width: '80%'}} ></span>
        <span onClick={remove} className="delete">remove</span>
    </div>
)

Popup.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Popup
