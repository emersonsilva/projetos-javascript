import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoInputSubmitCustomizado from './componentes/BotaoInputSubmitCustomizado';

class App extends Component {

    constructor() {
        super();
        this.state = {lista: [], nome: '', email: '', senha: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentWillMount() {
        $.ajax({
                url: "http://cdc-react.herokuapp.com/api/autores",
                dataType: 'json',
                success: function (resposta) {
                    this.setState({lista: resposta});
                }.bind(this)
            }
        );
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("Dados Sendo enviados");
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: function (resposta) {
                this.setState({lista: resposta});
            }.bind(this),
            error: function (resposta) {
                console.log("Erro");
            }
        });
    }

    setNome(evento){
        this.setState({nome: evento.target.value});
    }


    setEmail(evento){
        this.setState({email: evento.target.value});
    }


    setSenha(evento){
        this.setState({senha: evento.target.value});
    }

    render() {
        return (
            <div id="layout">

                <a href="#menu" id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a className="pure-menu-link">Livro</a></li>


                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                                <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>
                                <InputCustomizado id="email" label="E-mail" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                                <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>

                                <BotaoInputSubmitCustomizado label="Gravar"/>

                            </form>

                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.lista.map(function (autor) {
                                        return (
                                            <tr key={autor.id}>
                                                <td>{autor.nome}</td>
                                                <td>{autor.email}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default App;