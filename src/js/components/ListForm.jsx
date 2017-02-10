import React from 'react';


class ListForm extends React.Component {
    sendAjax(){
        var form = document.getElementById('entriesAdd'),
            formFileds = form.getElementsByClassName('formFiled');
        var formData = new FormData();
        for(var i=0; i<formFileds.length; i++) {
            formData.append(formFileds[i].name, formFileds[i].value);
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            }
        }
        xmlHttp.open("post", "/mongo");
        xmlHttp.send(formData);
    }

    submitClick(e) {
        e.preventDefault();
        var self = this;
        self.sendAjax();
        setTimeout(function(){ self.props.refreshClick(); }, 1000);
    }

   render() {
        return (
            <form id="entriesAdd" method="post" action="/mongo">
                title: <input className="formFiled" type="text" id="title" name="title" /><br />
                body: <textarea className="formFiled" type="text" id="body" name="body" /><br />
                <input type="submit" value="submit" onClick={(e) => {this.submitClick(e);}} />
            </form>
        )
   }
}

ListForm.propTypes = {
    refreshClick: React.PropTypes.func.isRequired
}

export default ListForm;