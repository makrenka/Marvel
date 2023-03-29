import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import { RandomChar } from "../randomChar/RandomChar";
import { CharList } from "../charList/CharList";
import { CharInfo } from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

export class App extends Component {

    state = {
        selectedId: null,
    }

    onSelected = (id) => {
        this.setState({
            selectedId: id,
        })
    }

    render() {
        const { selectedId } = this.state;

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onSelected={this.onSelected} selectedId={selectedId} />
                        <CharInfo selectedId={selectedId} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        );
    };
};