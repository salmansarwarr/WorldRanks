import { useState } from "react";
import Countriestable from "../Components/CountriesTable/Countriestable";
import Layout from "../Components/Layout/Layout";
import SearchInput from "../Components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
    const [keyword, setKeyword] = useState("");

    const filteredCountries = countries.filter(
        (country) =>
            country.name.toLowerCase().includes(keyword) ||
            country.region.toLowerCase().includes(keyword) ||
            country.subregion.toLowerCase().includes(keyword)
    );

    const onInputChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };

    return (
        <Layout>
            <div className={styles.inputContainer}>
                <div className={styles.counts}>
                    Found {countries.length} countries
                </div>
                <SearchInput
                    placeholder="Filter by Name, Region or SubRegion"
                    onChange={onInputChange}
                />
            </div>
            <Countriestable countries={filteredCountries} />
        </Layout>
    );
}

export const getStaticProps = async () => {
    try {
        const res = await fetch("https://restcountries.com/v2/all");
        const countries = await res.json();

        return {
            props: {
                countries,
            },
        };
    } catch (error) {
        console.log(error);
    }
};
