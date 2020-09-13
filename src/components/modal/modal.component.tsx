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
        this.closeModal = this.closeModal.bind(this);
    };

    public componentDidMount(): void {
        getApiContent(this.props.id).then((res: any) => {
            this.setState({
                beer: res[0],
            });
            document.body.classList.add('modal--open');
        });
    };
    
    public closeModal(): void {
        this.props.closeEvent();
    };
    
    public componentWillUnmount(): void {
        document.body.classList.remove('modal--open');
    }

    public render(): React.ReactElement<any> {
        if (this.state.beer === null) {
            return <React.Fragment></React.Fragment>;
        }
        return (
            <section className="modal">
                <button className="modal__close" onClick={this.closeModal}></button>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 modal__image">
                            <div className="modal__image__content">
                                <img src={this.state.beer.image_url} alt={`${this.state.beer.name} bottle visual`} title={`${this.state.beer.name} beer bottle`}/>
                                <h2 className="text_modal_title">{this.state.beer.name}</h2>
                            </div>
                        </div>
                        <div className="col-md-6 modal__content__container">
                            <div className="modal__content">
                                <div className="modal__content__content">
                                    <h2>{this.state.beer.name}</h2>
                                    <h3 className="modal__content__subtitle">{this.state.beer.tagline}</h3>
                                    <p className="modal__content__text">{this.state.beer.description}</p>
                                    <h3 className="text_table_title">Spécifications</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="text_table_spec">First Brewed</td>
                                                <td>{this.state.beer.first_brewed}</td>
                                            </tr>
                                            <tr>
                                                <td className="text_table_spec">ABV</td>
                                                <td>{this.state.beer.abv}</td>
                                            </tr>
                                            <tr>
                                                <td className="text_table_spec">IBU</td>
                                                <td>{this.state.beer.ibu}</td>
                                            </tr>
                                            <tr>
                                                <td className="text_table_spec">EBC / SRM</td>
                                                <td>{this.state.beer.ebc} / {this.state.beer.srm}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h3 className="text_table_title">Ingrédients</h3>
                                    <table>
                                        <tbody>
                                            {Object.keys(this.state.beer.ingredients).map((keyName: string, index: number): React.ReactElement<any> => (
                                                <tr key={index}>
                                                    <td className="text_table_spec">{keyName}</td>
                                                    <td>
                                                        {Array.isArray(this.state.beer?.ingredients[keyName]) ?
                                                            this.state.beer?.ingredients[keyName].map((ingredient: { name: string }, index: number): React.ReactElement<any> => (
                                                                <span key={index}>{ingredient.name}</span>
                                                            )) : 
                                                            this.state.beer?.ingredients[keyName]
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
};