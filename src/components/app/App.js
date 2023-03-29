import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import { RandomChar } from "../randomChar/RandomChar";
import { CharList } from "../charList/CharList";
import { CharInfo } from "../charInfo/CharInfo";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";

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
                    <ErrorBoundary>
                        <RandomChar />
                        <div className="char__content">
                            <CharList onSelected={this.onSelected} selectedId={selectedId} />
                            <CharInfo selectedId={selectedId} />
                        </div>
                    </ErrorBoundary>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        );
    };
};