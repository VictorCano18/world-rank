import './Home.scss';
import coverHeaderImage from '../assets/hero-image-wr.jpg'
import mainIcon from '../assets/Logo.svg'
import searchIcon from '../assets/Search.svg'
import axios from 'axios'
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'

const Home = () => {

    const [data, setData] = useState([])
    const [totalCountries, setTotalCountries] = useState(0)
    const [selectOption, setSelectOption] = useState('population')

    const consumeApi = async () => {
        let globalData = []
        if (!!data?.length) {
            const response = await axios.get('https://restcountries.com/v3.1/all')
            response.data.sort((a, b) => b[selectOption] - a[selectOption])
            console.log(response)
            globalData = response.data
        }
        else data.sort((a, b) => a[selectOption] - b[selectOption])

        setData(globalData)
        setTotalCountries(globalData?.length)
    }

    useEffect(() => {
        consumeApi()
    }, [
        selectOption
    ])

    return (
        <div className='container'>
            <section className='imageContainer'>
                <img src={coverHeaderImage} className='backgroundHeaderImage' />
                <img src={mainIcon} className='mainLogo' />
            </section>
            <section>
                <div className='tableContainer'>
                    <section className='tableContainerHeader'>
                        <section className='results'>
                            <strong>Found {totalCountries} countries</strong>
                        </section>
                        <section className='searchBar'>
                            <img src={searchIcon} className='searchBarIcon' />
                            <input
                                type="search"
                                id="searchBarInput"
                                name="q"
                                placeholder="Search by Name, Region, Subregion" />
                        </section>
                    </section>
                    <div className='tableBottomContainer'>
                        <section className="filtersContainer">
                            <section className="selectFilterContainer">
                                <label for="selectFilter">Sort by</label>
                                <select id="selectFilter" defaultValue={'population'} value={selectOption} onChange={e => setSelectOption(e.target.value)}>
                                    <option value="name.official">Name</option>
                                    <option value="population">Population</option>
                                    <option value="area">Area</option>
                                    <option value="region">Region</option>
                                </select>
                            </section>
                            <section className="groupButtonContainer">
                                <label for="groupButtonFilter">Region</label>
                                <div id="groupButtonFilter" className='groupButtonButtonsContainer'>
                                    <button>Americas</button>
                                    <button>Antartic</button>
                                    <button>Africa</button>
                                    <button>Asia</button>
                                    <button>Europe</button>
                                </div>
                            </section>
                            <section className="statusFiltarContainer">
                                <label for="statusFilter">Status</label>
                                <div className='checkBoxFilterContainer'>
                                    <div className='checkBoxFilterContainerInput'><input type='checkbox' id="member" /><label for="member">Member of the United States Nations</label></div>
                                    <div className='checkBoxFilterContainerInput'><input type='checkbox' id="independent" /><label for="independent">Independent</label></div>
                                </div>
                            </section>
                        </section>
                        <section className="tableCountries">
                            {(!!data.length)
                                ?
                                <section className='tableContainerCountries'>
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
                                </section>
                                :
                                <ClipLoader
                                    className='loader'
                                    color="rgba(246, 246, 246, 1)"
                                    loading
                                />}
                        </section>
                    </div>

                </div>
            </section >
        </div >
    )
}

export default Home;