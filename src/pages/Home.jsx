import './Home.scss';
import coverHeaderImage from '../assets/hero-image-wr.jpg'
import mainIcon from '../assets/Logo.svg'
import searchIcon from '../assets/Search.svg'
import axios from 'axios'
import { useEffect, useState } from 'react';

const Home = () => {

    const [data, setData] = useState([])
    const [totalCountries, setTotalCountries] = useState(0)

    const consumeApi = async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        setData(response.data)
        setTotalCountries(response.data.length)
    }

    useEffect(() => {
        consumeApi()
    }, [])

    return (
        <div className='container'>
            <headerSection className='imageContainer'>
                <img src={coverHeaderImage} />
                <img src={mainIcon} className='mainLogo' />
            </headerSection>
            <apiInformationSection>
                <div className='tableContainer'>
                    <tableContainerHeader className='tableContainerHeader'>
                        <resultsSection className='results'>
                            <strong>Found {totalCountries} countries</strong>
                        </resultsSection>
                        <searchBarSection className='searchBar'>
                            <img src={searchIcon} className='searchBarIcon' />
                            <input
                                type="search"
                                id="searchBarInput"
                                name="q"
                                placeholder="Search by Name, Region, Subregion" />
                        </searchBarSection>
                    </tableContainerHeader>
                    <div className='tableBottomContainer'>
                        <tableFilters className="filtersContainer">
                            Aquí van los filtros
                        </tableFilters>
                        <tableContainer className='tableContainerCountries'>
                            <table>
                                <tr className='tableHeaders'>
                                    <th>Flag</th>
                                    <th>Name</th>
                                    <th>Population</th>
                                    <th>Area (km²)</th>
                                    <th>Region</th>
                                </tr>
                                {data.map((country) => {
                                    return (
                                        <tr className='tableBody'>
                                            <td><img src={country.flags.svg} alt={country.flags.alt} className='flagImage'></img></td>
                                            <td className='nameWidth'>{country.name.official}</td>
                                            <td>{country.population}</td>
                                            <td>{country.area}</td>
                                            <td>{country.region}</td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </tableContainer>
                    </div>

                </div>
            </apiInformationSection >
        </div >
    )
}

export default Home;