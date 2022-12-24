/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async (id) => {
    try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
        const country = await res.json();

        return country;
    } catch (error) {
        console.log(error);
    }
};

function Country({ country }) {
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        setBorders(
            await Promise.all(
                country.borders.map((border) => getCountry(border))
            )
        );
    };

    useEffect(() => {
        getBorders();
    }, [country]);

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name} />
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>
                            {country.region}
                        </div>
                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>
                                    {country.population}
                                </div>
                                <div className={styles.overview_label}>
                                    Population
                                </div>
                            </div>
                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>
                                    {country.area}
                                </div>
                                <div className={styles.overview_label}>
                                    Area
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details}>
                        <h4 className={styles.details_heading}>Details</h4>
                        <div className={styles.details_row}>
                            <div className={styles.details_label}>Capital</div>
                            <div className={styles.details_value}>
                                {country.capital}
                            </div>
                        </div>
                        <div className={styles.details_row}>
                            <div className={styles.details_label}>
                                Languages
                            </div>
                            <div className={styles.details_value}>
                                {country.languages
                                    .map(({ name }) => name)
                                    .join(", ")}
                            </div>
                        </div>
                        <div className={styles.details_row}>
                            <div className={styles.details_label}>
                                Currencies
                            </div>
                            <div className={styles.details_value}>
                                {country.currencies
                                    .map(({ name }) => name)
                                    .join(", ")}
                            </div>
                        </div>
                        <div className={styles.details_row}>
                            <div className={styles.details_label}>
                                Native Name
                            </div>
                            <div className={styles.details_value}>
                                {country.nativeName}
                            </div>
                        </div>
                        <div className={styles.details_row}>
                            <div className={styles.details_label}>
                                Subregion
                            </div>
                            <div className={styles.details_value}>
                                {country.subregion}
                            </div>
                        </div>

                        <div className={styles.details_borders}>
                            <div className={styles.details_borders_label}>
                                Neighbouring Countries
                            </div>
                            <div className={styles.details_borders_container}>
                                {borders.map(({ flag, name, alpha3Code }) => (
                                    <Link
                                        key={name}
                                        href={`/country/${alpha3Code}`}
                                    >
                                        <div
                                            className={
                                                styles.details_borders_country
                                            }
                                        >
                                            <img src={flag} alt={name} />
                                            <div
                                                className={
                                                    styles.details_borders_name
                                                }
                                            >
                                                {name}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Country;

export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();

    const paths = countries.map((country) => {
        const counrty = country
        if (
            country.alpha3Code !== "ATA" &&
            country.alpha3Code !== "GNQ" &&
            country.alpha3Code !== "LCA" &&
            country.alpha3Code !== undefined &&
            country.alpha3Code !== null
        ) {
            return {
                params: { id: counrty.alpha3Code },
            };
        } else {
            return {
                params: { id: "PAK" }
            }
        }
    });

    console.log(paths);

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const country = await getCountry(params.id);

    return {
        props: {
            country,
        },
    };
};
