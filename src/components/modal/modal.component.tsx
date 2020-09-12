import * as React from 'react';
import { IBeerModal } from "Interfaces";
import { getApiContent } from "Services";

import "./modal.component.sass";

interface IModalProps {
    id: string,
    closeEvent: () => void
}

interface IModalState {
    beer: IBeerModal | null
}

export class ModalComponent extends React.Component<IModalProps, IModalState> {
    private constructor(props: IModalProps) {
        super(props);
        this.state = {
            beer : null
        };
    };

    public componentDidMount = () => {
        getApiContent(this.props.id).then((res: any) => {
            this.setState({
                beer: res[0]
            });
        });
    };

    public render(): React.ReactElement<any> {
        if (this.state.beer === null) {
            return <React.Fragment></React.Fragment>;
        }
        return (
            <section className="modal">
                <button className="modal__close"></button>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 modal__image">
                            <div className="modal__image__content">
                                <img src={this.state.beer.image_url} alt={`${this.state.beer.name} bottle visual`} title={`${this.state.beer.name} beer bottle`}/>
                                <h2 className="text_modal_title">{this.state.beer.name}</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="modal__content">
                                <div className="modal__content__content">
                                    <h2>{this.state.beer.name}</h2>
                                    <h3 className="modal__content__subtitle">{this.state.beer.tagline}</h3>
                                    <p className="modal__content__text">{this.state.beer.description}</p>
                                    <h3 className="text_table_title">Spécifications</h3>
                                    <h3 className="text_table_title">Ingrédients</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
};