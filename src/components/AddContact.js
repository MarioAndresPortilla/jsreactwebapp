import React from "react";

class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
    };

        add = (e) => {
            e.preventDefault();
            /*localStorage.setItem("value","say");*/
            if (this.state.name === "" || this.state.email === "") {
                alert("All the fields are mandatory!");
                return
            }
            this.props.addContactHandler(this.state);
            this.setState({ name: "", email: "" });
            this.props.history.push("/");
        };
        render() {
            return (
                <div className="ui main">
                    <form className="ui form" onSubmit={this.add}>
                        <h2>Add Contact</h2>
                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={ (e) => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={ (e) => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <button className="ui button red">Add</button>
                    </form>
                </div>
        );
    }
}
export default AddContact;