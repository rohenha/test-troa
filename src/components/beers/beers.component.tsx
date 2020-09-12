import * as React from 'react';
import { getApiContent } from "Services";
import { IBeer } from "Interfaces";
import { BeerArticleComponent, FooterComponent, HeaderComponent, ModalComponent } from "Components";

import "./beers.component.sass";

interface IBeersProps {
}

interface IBeersState {
    list: IBeer[],
    beer: IBeer | null
}

export class BeersComponent extends React.Component<IBeersProps, IBeersState> {
    private constructor(props: IBeersProps) {
        super(props);
        this.state = {
            list: [],
            beer: null
        }
    };

    public componentDidMount = () => {
        getApiContent('').then((res: any) => {
            setTimeout(() => {
                this.setState({
                    list: res
                });
            }, 1000);
        });
    };

    public openModal = (beer: IBeer): void => {
        this.setState({
            beer: beer
        });
    };

    public closeModal = (): void => {};

    public render(): React.ReactElement<any> {
        return (
            <React.Fragment>
                <HeaderComponent />
                {this.state.beer !== null ?
                    <ModalComponent id={this.state.beer.id} closeEvent={this.closeModal.bind(this)} /> : null}
                <main className="beers_container">
                    <h1>beers</h1>
                    <div className="container">
                        <ul className="row">
                            {this.state.list.map((beer: IBeer) => (
                                <BeerArticleComponent key={beer.id} beer={beer} event={() => {
                                    this.openModal(beer);
                                }} />
                            ))}
                        </ul>
                    </div>
                </main>
                <FooterComponent />
            </React.Fragment>
        );
    };
};
