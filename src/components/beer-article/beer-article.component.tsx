import * as React from 'react';
import { IBeer } from "Interfaces";
import VisibilitySensor from 'react-visibility-sensor';

import "./beer-article.component.sass";

interface IBeerArticleProps {
    beer: IBeer,
    event: () => void
}

interface IBeerArticleState {
    visible: boolean
}

export class BeerArticleComponent extends React.Component<IBeerArticleProps, IBeerArticleState> {

    private constructor(props: IBeerArticleProps) {
        super(props);
        this.state = {
            visible: false
        }
    };

    private onChange = (isVisible: boolean) => {
        this.setState({
            visible: isVisible
        });
    };

    public render(): React.ReactElement<any> {
        return (
            <VisibilitySensor onChange={this.onChange} scrollThrottle={100} partialVisibility={true}>
                <article className={`col-md-5 beer_article ${Number(this.props.beer.id) % 2 ? "" : "offset-md-2"} ${this.state.visible ? "" : "beer_article__hidden"}`}>
                    <div className="row beer_article__container">
                        <div className="col-6 offset-3 col-md-4 offset-md-0 beer_article__image">
                            <img src={this.props.beer.image_url} alt={`${this.props.beer.name} bottle visual`} title={`${this.props.beer.name} beer bottle`}/>
                        </div>
                        <div className="col-12 col-md-8 beer_article__text">
                            <div>
                                <h2>{this.props.beer.name}</h2>
                                <h3>{this.props.beer.tagline}</h3>
                                <button className="button" onClick={this.props.event}>See More</button>
                            </div>
                        </div>
                    </div>
                </article>
            </VisibilitySensor>
        );
    };
};