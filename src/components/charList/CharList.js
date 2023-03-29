import { Component } from 'react';
import classNames from 'classnames';

import { MarvelService } from '../../services/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charList.scss';

export class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEded: false,
    }

    marvelService = new MarvelService();

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        };

        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    updateCharList = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updateCharList();
    }

    render() {
        const { loading, error, charList, offset, newItemLoading, charEnded } = this.state;
        const { selectedId, onSelected } = this.props;

        return (
            <div className="char__list">
                {loading && <Spinner />}
                {error && <ErrorMessage />}
                <ul className="char__grid">
                    {charList.map(({ thumbnail, name, id }) =>
                        <li
                            className={classNames({ char__item: true, 'char__item_selected': id === selectedId })}
                            key={id}
                            data-id={id}
                            onClick={() => { onSelected(id) }}
                        >
                            <img
                                src={thumbnail}
                                alt={name}
                                className={classNames({ 'available': thumbnail.includes('available') })}
                            />
                            <div className="char__name">{name}</div>
                        </li>
                    )}
                </ul>
                <button
                    className={classNames("button button__main button__long", { unactive: charEnded })}
                    onClick={() => { this.updateCharList(offset) }}
                    disabled={newItemLoading}
                >
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}