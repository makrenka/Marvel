import { Component } from 'react';
import classNames from 'classnames';

import { MarvelService } from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charInfo.scss';

export class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateChar = () => {
        const { selectedId } = this.props;
        if (!selectedId) { return };

        this.setState({ loading: true })

        this.marvelService
            .getCharacter(selectedId)
            .then(this.onCharLoaded)
            .catch(this.onError);


    };

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedId !== prevProps.selectedId) {
            this.updateChar();
        };
    };

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = loading || error || !char ? null : <View char={char} />;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    };
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={name}
                    className={classNames({ 'available': thumbnail.includes('available') })}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            {comics.length
                ? <ul className="char__comics-list">
                    {comics.slice(0, 10).map((item, i) =>
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    )}
                </ul>
                : <p>There is no comics for this character</p>}

        </>
    )
}