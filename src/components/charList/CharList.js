import { Component } from 'react';

import { MarvelService } from '../../services/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charList.scss';

export class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    onCharList = (charList) => {
        this.setState({
            charList,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharList)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updateCharList();
    }

    render() {
        const { loading, error, charList } = this.state;
        const { selectedId, onSelected } = this.props;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                <ul className="char__grid">
                    {charList.map(({ thumbnail, name, id }) =>
                        <li
                            className={"char__item " + (id === selectedId && 'char__item_selected')}
                            key={id}
                            data-id={id}
                            onClick={() => { onSelected(id) }}
                        >
                            <img
                                src={thumbnail}
                                alt={name}
                                className={thumbnail.includes('available')
                                    ? 'available'
                                    : ''}
                            />
                            <div className="char__name">{name}</div>
                        </li>
                    )}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}