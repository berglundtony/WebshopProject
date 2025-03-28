import Image from "next/image";
import styles from "./categoryIcons.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function ShowCampaingCategories() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div>
    <div className={styles.categoryGroup}>
      <div className={styles.tabs}>
        <Link
            className={`${styles.tab} ${activeTab === "home" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("home")}
            href="#"
          >  Hem
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === "vehicle" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("vehicle")}
            href="#">
          Fordon
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === "electronics" ? styles.activeTab : ""
            }`}
          onClick={() => setActiveTab("electronics")}
          href="#">
          Elektronik
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === "woman" ? styles.activeTab : ""
            }`}
          onClick={() => setActiveTab("woman")}
          href="#">
          Dam
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === "men" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("men")}
            href="#">
          Herr
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === "sport" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("sport")}
            href="#">
          Sport
        </Link>
        </div>
      </div>
      {
        activeTab === "home" && (
          <ul className={styles.categoryList}>
            <li className={styles.home} data-catagory-group={'home'}>
              <a onClick={() => {
                router.push(`/products?filterBy=furniture`);
              }}>
                <Image
                  className={styles.product}
                  src={'/9165796_sofa_furniture_icon.svg'}
                  width={580}
                  height={580}
                  alt={`Bild på möbler`}
                />
                <p className={styles.category}>Möbler</p>
              </a>
            </li>
            <li className={styles.home} data-catagory-group={'home'}>
              <a onClick={() => {
                router.push(`/products?filterBy=home-decoration`);
              }}>
                <Image
                  className={styles.product}
                  src={'/living-room.png'}
                  width={380}
                  height={380}
                  alt={`Bild på hemdekoration`}
                />
                <p className={styles.category}>Hemdekoration</p>
              </a>
            </li>
            <li className={styles.home} data-catagory-group={'home'}>
              <a onClick={() => {
                router.push(`/products?filterBy=kitchen-accessories`);
              }}>
                <Image
                  className={styles.product}
                  src={'/rice-cooker.png'}
                  width={380}
                  height={380}
                  alt={`Bild på köksassocearer`}
                />
                <p className={styles.kitchen_accessories}>Köksassocearer</p>
              </a>
            </li>
            <li className={styles.home} data-catagory-group={'home'}>
              <a onClick={() => {
                router.push(`/products?filterBy=groceries`);
              }}>
                <Image
                  className={styles.product}
                  src={'/food.png'}
                  width={380}
                  height={380}
                  alt={`Bild på mat`}
                />
                <p className={styles.category}>Specerier</p>
              </a>
            </li>
          </ul>
        )}
      {activeTab === "electronics" && (
        <ul className={styles.categoryList}>
          <li className='tablets' data-catagory-group={'computing'}>
            <a onClick={() => {
              router.push(`/products?filterBy=laptops`);
            }}>
              <Image
                className={styles.product}
                src={'/laptop.png'}
                width={380}
                height={380}
                alt={`Bild på bärbardator`}
              />
              <p className={styles.laptops}>Bärbara datorer</p>
            </a>
          </li>
          <li className={styles.computing} data-catagory-group={'computing'}>
            <a onClick={() => {
              router.push(`/products?filterBy=tablets`);
            }}>
              <Image
                className={styles.product}
                src={'/tablet.png'}
                width={380}
                height={380}
                alt={`Bild på en surfplatta`}
              />
              <p className={styles.category}>Surfplattor</p>
            </a>
          </li>
          <li className={styles.computing} data-catagory-group={'computing'}>
            <a onClick={() => {
              router.push(`/products?filterBy=cell-phone`);
            }}>
              <Image
                className={styles.product}
                src={'/cell-phone.png'}
                width={380}
                height={380}
                alt={`Bild på mobil`}
              />
              <p className={styles.category}>Mobiler</p>
            </a>
          </li>
          <li className={styles.computing} data-catagory-group={'computing'}>
            <a onClick={() => {
              router.push(`/products?filterBy=mobile-accessories`);
            }}>
              <Image
                className={styles.product}
                src={'/music.png'}
                width={380}
                height={380}
                alt={`Bild på mobilaccessoarer`}
              />
              <p className={styles.category}>Mobilaccessoarer</p>
            </a>
          </li>
        </ul>
      )}
      {activeTab === "vehicle" && (
        <ul className={styles.categoryList}>
          <li className='vehicle' data-catagory-group={'vehicle'}>
            <a onClick={() => {
              router.push(`/products?filterBy=motorcycle`);
            }}>
              <Image
                className={styles.product}
                src={'/motorcycle.png'}
                width={380}
                height={380}
                alt={`Motorcycle`}
              />
              <p className={styles.category}>Motorcyklar</p>
            </a>
          </li>
          <li className='vehicle' data-categories={'vehicle'} data-catagory-group={'vehicle'}>
            <a onClick={() => {
              router.push(`/products?filterBy=vehicle`);
            }}>
              <Image
                className={styles.product}
                src={'/car.png'}
                width={380}
                height={380}
                alt={`Bild på en bil.`}
              />
              <p className={styles.category}>Bilar</p>
            </a>
          </li>
        </ul>
      )}
      {activeTab === "woman" && (
        <ul className={styles.categoryList}>
          <li className={styles.beauty} data-catagory-group={'beauty'}>
            <a onClick={() => {
              router.push(`/products?filterBy=beauty`);
            }}>
              <Image
                className={styles.product}
                src={'/mascara.png'}
                width={380}
                height={380}
                alt={`Bild på skönhetsprodukter`}
              />
              <p className={styles.beauty}>Skönhetsprodukter</p>
            </a>
          </li>
          <li className={styles.beauty} data-catagory-group={'beauty'}>
            <a onClick={() => {
              router.push(`/products?filterBy=fragrances`);
            }}>
              <Image
                className={styles.product}
                src={'/fragrance.png'}
                width={380}
                height={380}
                alt={`Bild på parfym`}
              />
              <p className={styles.category}>Parfym</p>
            </a>
          </li>
          <li className={styles.beauty} data-catagory-group={'beauty'}>
            <a onClick={() => {
              router.push(`/products?filterBy=skin-care`);
            }}>
              <Image
                className={styles.product}
                src={'/skincare.png'}
                width={380}
                height={380}
                alt={`Hudvård`}
              />
              <p className={styles.category}>Hudvård</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=tops`);
            }}>
              <Image
                className={styles.product}
                src={'/dress.png'}
                width={380}
                height={380}
                alt={`Bild på topp`}
              />
              <p className={styles.category}>Toppar</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=womens-dresses`);
            }}>
              <Image
                className={styles.product}
                src={'/long-sleeves-dress.png'}
                width={380}
                height={380}
                alt={`Bild på klänningar`}
              />
              <p className={styles.category}>Klänningar</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=womens-shoes`);
            }}>
              <Image
                className={styles.product}
                src={'/high-heel.png'}
                width={380}
                height={380}
                alt={`Bild på damskor`}
              />
              <p className={styles.category}>Damskor</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=womens-bags`);
            }}>
              <Image
                className={styles.product}
                src={'/woman-bag.png'}
                width={380}
                height={380}
                alt={`Bild på damväskor`}
              />
              <p className={styles.category}>Damväskor</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=womens-jewellery`);
            }}>
              <Image
                className={styles.product}
                src={'/pearl-necklace.png'}
                width={380}
                height={380}
                alt={`Bild på damsmycken`}
              />
              <p className={styles.category}>Damsmycken</p>
            </a>
          </li>
          <li className={styles.woman} data-catagory-group={'woman'}>
            <a onClick={() => {
              router.push(`/products?filterBy=womens-watches`);
            }}>
              <Image
                className={styles.product}
                src={'/woman.png'}
                width={380}
                height={380}
                alt={`Bild på damklockor`}
              />
              <p className={styles.category}>Damklockor</p>
            </a>
          </li>
        </ul>
      )}
      {activeTab === "men" && (
        <ul className={styles.categoryList}>
          <li className={styles.men} data-catagory-group={'men'}>
            <a onClick={() => {
              router.push(`/products?filterBy=mens-shoes`);
            }}>
              <Image
                className={styles.product}
                src={'/mens-shoes.png'}
                width={380}
                height={380}
                alt={`Bild på herrskor`}
              />
              <p className={styles.category}>Herrskor</p>
            </a>
          </li>
          <li className={styles.men} data-catagory-group={'men'}>
            <a onClick={() => {
              router.push(`/products?filterBy=mens-shirts`);
            }}>
              <Image
                className={styles.product}
                src={'/mens-shirt.png'}
                width={380}
                height={380}
                alt={`Bild på herrskortor`}
              />
              <p className={styles.category}>Herrskortor</p>
            </a>
          </li>
          <li className={styles.men} data-catagory-group={'men'}>
            <a onClick={() => {
              router.push(`/products?filterBy=mens-watches`);
            }}>
              <Image
                className={styles.product}
                src={'/watch.png'}
                width={380}
                height={380}
                alt={`Bild på herrklocka`}
              />
              <p className={styles.category}>Herrklockor</p>
            </a>
          </li>
        </ul>
      )}
      {activeTab === "sport" && (
        <ul className={styles.categoryList}>
          <li className='sports' data-categories={'sports-accessories'} data-catagory-group={'sports'}>
            <a onClick={() => {
              router.push(`/products?filterBy=sports-accessories`);
            }}>
              <Image
                className={styles.product}
                src={'/hand-grip.png'}
                data-category={'sports-accessories'}
                width={380}
                height={380}
                alt={`Sportartiklar`}
              />
              <p className={styles.category}>Sportartiklar</p>
            </a>
          </li>
          <li className={styles.men} data-catagory-group={'spots'}>
            <a onClick={() => {
              router.push(`/products?filterBy=sunglasses`);
            }}>
              <Image
                className={styles.product}
                src={'/sun-glasses.png'}
                width={380}
                height={380}
                alt={`Bild på solglasögon`}
              />
              <p className={styles.category}>Solglasögon</p>
            </a>
          </li>
        </ul>
      )}
      </div>
  
  )
}