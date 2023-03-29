import React, { Component } from 'react';
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
        charEnded: false,
    }

    marvelService = new MarvelService();

    myRef = React.createRef();

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

    changeClassItem = () => {
        const items = Array.from(this.myRef.current.childNodes);
        items.map(item => +item.dataset.id === this.props.selectedId
            ? item.classList.add('char__item_selected')
            : item.classList.remove('char__item_selected'));
    };

    componentDidMount() {
        this.updateCharList();
    };

    componentDidUpdate(prevProps) {
        if (this.props.selectedId !== prevProps.selectedId) {
            this.changeClassItem();
        };
    };

    render() {
        const { loading, error, charList, offset, newItemLoading, charEnded } = this.state;
        const { onSelected } = this.props;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                <ul className="char__grid" ref={this.myRef}>
                    {charList.map(({ thumbnail, name, id }) =>
                        <li
                            // className={classNames({ char__item: true, 'char__item_selected': id === selectedId })}
                            className='char__item'
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