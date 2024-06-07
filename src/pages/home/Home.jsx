import './Home.scss';
import coverHeaderImage from '../../assets/hero-image-wr.jpg'
import mainIcon from '../../assets/Logo.svg'
import axios from 'axios'
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
import { Link } from 'react-router-dom'

const Home = () => {

    const [data, setData] = useState([])
    const [totalCountries, setTotalCountries] = useState(0)
    const [selectOption, setSelectOption] = useState('population')
    const [checkOption1, setCheckOption1] = useState(false)
    const [checkOption2, setCheckOption2] = useState(false)
    const [errorDataServer, setErrorDataServer] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [region, setRegion] = useState(['Americas', 'Europe', 'Antarctic', 'Africa', 'Asia', 'Oceania'])
    const [dataBack, setDataBack] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const fetchData = async () => {
        setLoading(true)
        setErrorDataServer(false)
        setNotFound(false)
        setData([])
        setTotalCountries(0)
        try {
            const url = `https://restcountries.com/v3.1/all?fields=name,population,region,flag,flags,independent,unMember,area,capital,languages,subregion,currencies,continents,borders,cioc`
            const response = await axios.get(url);
            response.data.sort((a, b) => b[selectOption] - a[selectOption])
            setData(response.data);
            setDataBack(response.data)
            setTotalCountries(response.data.length)
            setErrorDataServer(false)
            setNotFound(false)
        } catch (error) {
            setErrorDataServer(true)
            setNotFound(false)
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    };

    const onChangeSelectedFilterValue = () => {
        setNotFound(false)
        let data = [...dataBack]
        let sortedData = [];
        if (selectOption === 'name.common' || selectOption === 'region') {
            if (selectOption === 'name.common') {
                sortedData = [...data].sort((a, b) => {
                    if (a.name.common > b.name.common) return 1;
                    if (a.name.common < b.name.common) return -1;
                    return 0;
                });
            } else {
                sortedData = [...data].sort((a, b) => {
                    if (a[selectOption] > b[selectOption]) return 1;
                    if (a[selectOption] < b[selectOption]) return -1;
                    return 0;
                });
            }
        } else {
            sortedData = [...data].sort((a, b) => b[selectOption] - a[selectOption]);
        }

        if (checkOption1) {
            sortedData = [...sortedData].filter(country => country.unMember)
        }
        if (checkOption2) {
            sortedData = [...sortedData].filter(country => country.independent)
        }
        if (!checkOption1 && checkOption2) setData([...dataBack])

        if (region.length !== 6)
            if (region.length) sortedData = sortedData.filter(country => region.includes(country.region))

        if (searchValue.length)
            sortedData = sortedData.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()) || country.region.toLowerCase().includes(searchValue.toLowerCase()))
        if (!(!!sortedData.length)) setNotFound(true)
        return sortedData;
    }

    const onClickButtonFilter = (e) => {
        let newRegion = []
        if (document.getElementById(e.target.id).style.cssText !== 'background-color: unset;') {
            document.getElementById(e.target.id).style.backgroundColor = 'unset'
            newRegion = [...region].filter(item => item !== e.target.id)
            setRegion(newRegion)
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#282c31'
            newRegion = [...region, e.target.id]
        }
        setRegion(newRegion)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const sortedData = onChangeSelectedFilterValue()
        setData(sortedData)
        setTotalCountries(sortedData.length)
    }, [selectOption, checkOption1, checkOption2, region, searchValue])

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
                            <input
                                type="search"
                                id="searchBarInput"
                                name="q"
                                onChange={e => setSearchValue(e.target.value)}
                                placeholder="Search by Name, Region, Subregion" />
                        </section>
                    </section>
                    <div className='tableBottomContainer'>
                        <section className="filtersContainer">
                            <section className="selectFilterContainer">
                                <label htmlFor="selectFilter">Sort by</label>
                                <select id="selectFilter" value={selectOption} onChange={e => { setSelectOption(e.target.value) }}>
                                    <option value="name.common">Name</option>
                                    <option value="population">Population</option>
                                    <option value="area">Area</option>
                                    <option value="region">Region</option>
                                </select>
                            </section>
                            <section className="groupButtonContainer">
                                <label htmlFor="groupButtonFilter">Region</label>
                                <div id="groupButtonFilter" className='groupButtonButtonsContainer'>
                                    <button id="Americas" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Americas</button>
                                    <button id="Antarctic" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Antarctic</button>
                                    <button id="Africa" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Africa</button>
                                    <button id="Asia" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Asia</button>
                                    <button id="Europe" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Europe</button>
                                    <button id="Oceania" style={{ 'backgroundColor': '#282c31' }} onClick={e => onClickButtonFilter(e)}>Oceania</button>
                                </div>
                            </section>
                            <section className="statusFiltarContainer">
                                <label htmlFor="statusFilter">Status</label>
                                <div className='checkBoxFilterContainer'>
                                    <div className='checkBoxFilterContainerInput'><input type='checkbox' id="member" onClick={e => setCheckOption1(e.target.checked)} /><label htmlFor="member">Member of the United States Nations</label></div>
                                    <div className='checkBoxFilterContainerInput'><input type='checkbox' id="independent" onClick={e => setCheckOption2(e.target.checked)} /><label htmlFor="independent">Independent</label></div>
                                </div>
                            </section>
                        </section>
                        <section className="tableCountries">
                            {errorDataServer
                                ? <div>
                                    <div className='errorMessage'>There was an error with the server!</div>
                                </div>
                                : (
                                    data.length > 0
                                        ? (
                                            <section className='tableContainerCountries'>
                                                    <table>
                                                            <tr className='tableHeaders headersBody tableBody'>
                                                                <td>Flag</td>
                                                                <td>Name</td>
                                                                <td>Population</td>
                                                                <td>Area (km²)</td>
                                                                <td className='region'>Region</td>
                                                            </tr>
                                                            {data.map((country) => (
                                                                <Link to='/selected-country' state={{ country, data }} key={country.flag}>
                                                                    <tr className='tableBody'>
                                                                        <td><img src={country.flags.svg} alt={country.flags.alt} className='flagImage' /></td>
                                                                        <td>{country.name.common}</td>
                                                                        <td>{country.population}</td>
                                                                        <td>{country.area}</td>
                                                                        <td className='region'>{country.region}</td>
                                                                    </tr>
                                                                </Link>
                                                            ))}
                                                    </table>
                                                </section>
                                        )
                                        : (
                                            !(notFound && loading)
                                                ? <div className='notFound'>Not found!</div>
                                                : <ClipLoader className='loader' color="rgba(246, 246, 246, 1)" loading />
                                        )
                                )
                            }
                        </section>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Home;