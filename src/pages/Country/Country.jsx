import { useLocation } from "react-router-dom";
import './Country.scss'
import coverHeaderImage from '../../assets/hero-image-wr.jpg'
import mainIcon from '../../assets/Logo.svg'

const Country = () => {
    const location = useLocation();
    const country = location.state;
    const languages = Object.values(country.languages)
    const currencies = Object.values(country.currencies)
    const allCurrencies = currencies.map(curr => curr.name)
    
    return (
        <div>
            <section className='imageContainerCountry'>
                <img src={coverHeaderImage} className='backgroundHeaderImageCountry' />
                <img src={mainIcon} className='mainLogoCountry' />
            </section>
            <section className="tableContainer">
                <div><img src={country.flags.svg} alt={country.flags.alt} className="flagImageCountry" /></div>
                <div className="tableCountry">
                    <div className="nameContainerCountry">
                        <div>{country.name.common}</div>
                        <div>{country.name.official}</div>
                    </div>
                    <div className="populationAreaContainerCountry">
                        <div><p>Population</p> {country.population}</div>
                        <div><p>Area (km²)</p> {country.area}</div>
                    </div>
                    <div className="listInfoCountry">
                        <div>Capital <p>{country.capital.length > 1 ? country.capital.join(', ') : country.capital[0]}</p></div>
                        <div>Subregion <p>{country.subregion}</p></div>
                        <div>Language <p>{languages.length > 1 ? languages.join(', ') : languages[0]}</p></div>
                        <div>Currencies <p>{allCurrencies.length > 1 ? allCurrencies.join(', ') : allCurrencies[0]}</p></div>
                        <div className="lastListInfoCountry">Continents <p>{country.continents.length > 1 ? country.continents.join(', ') : country.continents[0]}</p></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Country