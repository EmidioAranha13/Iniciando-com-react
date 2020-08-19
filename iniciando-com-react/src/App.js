import React from 'react';
//import Nav from './components/nav'
//import logo from './logo.svg';

//<img className="img-react" alt="img-react" src="https://media.bitdegree.org/storage/media/images/2018/10/The-Most-Essential-React-Interview-Questions.jpg"/>
//Sem usar o modo classe. também funciona.
/*
function App(props) {

  criaComboBox = () => {
    const estados_BR = ["-","AM","AC","BA","CE","PA"]
    const comboBoxOpcoes = estados_BR.map( opcao => <option>{opcao}</option>)
    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }
  
  return (
    <div>
        <header className="App-header">
          <div>
            <h1>Seja bem vindo ao iniciando meus estudos com react!</h1>
          </div>
        </header>
        <div id="div-info">
          <label for="nome">Nome:</label>
          <input id="nome" type="text" value={props.nome} onChange={insercao_dados} />
          <br/>
          {criaComboBox()}
          <h1>Olá {props.nome}</h1>
        </div>
      <footer>
      </footer>
    </div>
  );
}
*/
class App extends React.Component{

  state = {
    nome: "",
    data: ""
  }

  /*
  //essa forma se cria através de método construtor. Mas terá que criar um para cada função.

  constructor(){
    super()
    this.insercao_dados = this.insercao_dados.bind(this)
  }

  insercao_dados(evento){
    //Função que seta os valores do evento em state.
    this.setState({
      nome: evento.target.value,
      data: evento.target.value
    })
  }
   */ 

  insercao_dados = (evento) =>{

    const dados = evento.target.value
    const campos = evento.target.name
    
    this.setState({
      [campos]: dados
    })
  }

  criaComboBox = () => {
    const estados_BR = ["-","AM","AC","BA","CE","PA"]
    const comboBoxOpcoes = estados_BR.map( opcao => <option>{opcao}</option>)
    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }

  render(){
    return(
      <div id="img-fundo">
        <header className="App-header">
          <div>
            <h1 className="custom-h1">Seja bem vindo ao SpaceStation!</h1>
          </div>
        </header>
        <div id="div-info1">
          <label id="label1" for="nome">Nome: </label>
          <input id="nome" type="text" value={this.state.nome} name="nome" onChange={this.insercao_dados} />
          <label id="label1" for="data">DdeN: </label>
          <input id="data" type="date" value={this.state.data} name="data" onChange={this.insercao_dados} />
          <br/>
          {this.criaComboBox()}
          <h1 className="custom-h1">Olá {this.state.nome} com data de nascimento em ({this.state.data}).</h1>
        </div>
        <div id="div-info2">
          <p>
            O que é o Lorem Ipsum? <br/>
            O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.
            <br/><br/>
            Porque é que o usamos?<br/>
            É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição mais ou menos normal de letras, ao contrário do uso de "Conteúdo aqui, conteúdo aqui", tornando-o texto legível. Muitas ferramentas de publicação electrónica e editores de páginas web usam actualmente o Lorem Ipsum como o modelo de texto usado por omissão, e uma pesquisa por "lorem ipsum" irá encontrar muitos websites ainda na sua infância. Várias versões têm evoluído ao longo dos anos, por vezes por acidente, por vezes propositadamente (como no caso do humor).
            
          </p>
        </div>
      <footer>
      </footer>
    </div>
    )
  }
}

export default App;