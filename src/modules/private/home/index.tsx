import React from 'react';
import Wrapper from '@/shared/components/wrapper';
import {ScrollView, Text, View} from 'react-native';
import Header from '@/modules/private/home/components/header';
import Input from '@/shared/components/input';
import Icon from '@/shared/components/icon';
import {filter, search} from '@/shared/assets/icons';
import {styles} from './styles';
import SpecialOffers from '@/modules/private/home/components/specialOffers';
import MostPopular from '@/modules/private/home/components/mostPopular';
import Categories from '@/shared/components/categories';
import useProducts from '@/shared/hooks/useProducts';
import ProductsSlider from '@/shared/components/productsSliders';
import {StoreContext} from '@/context/context';
import {normalize} from '@/shared/helpers';

export default function Home() {
  const {
    data: products,
    error,
    isLoading,
    isValidating,
    favoritesData,
    favoritesError,
    isLoadingFavorites,
    isValidatingFavorites,
  } = useProducts();
  const {user} = React.useContext(StoreContext);

  return (
    <Wrapper isDark={true} loading={isLoading || isValidating}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Header />
        <View style={{height: normalize(20)}} />
        <View style={{paddingHorizontal: normalize(24)}}>
          <Text style={styles.subtitle}>
            Bienvenido!{' '}
            {user && user.user_metadata && (
              <>
                {user?.user_metadata?.first_name}{' '}
                {user?.user_metadata?.last_name}
              </>
            )}
          </Text>
          <SpecialOffers
            banners={[
              {
                image:
                  'https://img.freepik.com/foto-gratis/vista-superior-surtido-mariscos-tomates_23-2148643583.jpg',
                state: '2',
                name: 'Del mar a tu mesa',
                description: 'Productos frescos para tu hogar',
              },
              {
                image:
                  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgWFhYZGRgYGhoYHBgaGhoaHBkaGhgaGhoaGiEcIS4lHB4rHxgZJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjQsJCs0NDY0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBKwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEMQAAIBAgQDBQYDBgUCBgMAAAECEQADBBIhMQVBURMiYXGBBjKRobHwQsHRFFJicqLhI4KSsvEV0kNjk6PC4gcWJP/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgQDBQb/xAAqEQACAgIBAwMEAgMBAAAAAAAAAQIRAyExBBJRIkFhBRMygXGRIzOhFP/aAAwDAQACEQMRAD8A3VXxqQLFBRK1ey1Z5ydB6UQWhBFOWIrnTOloJaMa0CmpAKhlLY2WjWlNKpLDApyKANThqloLERqPJvqtPFQqWzkEjLllRBBE5QQTOuoJ2GhA5SZSaURsc0IFKaaqAOKRFMDSBpBYgKICkDRCkwFFKKUUgKAEKIGkFp8tIBxT00U9IYgKekKVIB6ehohQAopwKQp6AEBRBaYU4NIYUU4WmmkKkAstZuM4zat3Usk5nYwQNkn3cx5EmBG+tYXtB7VRKYc+BuD6W/8Au+HI1ySsRBB70zPjMzWDqer7PTDnyasWDu3I9S/bv4fn/am/bj+5/V/9ao4O8LiI4/GoPkeY9DI9KsZa8f8A9/U+TR9jH4Oas3AiZ7bNcRQM4/ErZoMAaruCJAnWK0bbhhpy0IOhB6EcjXN4K7azB8L3XVADbfNluwVzDQsWzLPd1MgQrVuYhEe4WsuiXO0uK6MZzuIhUjR+8COsuswa+ow55Q1Lg87NhTprnyWwKP1qO3JAJAB5gHY9PDy5UWWvRTUlaMTTi6CAqVWqIIakVZqJJFRbDmnC0AWpVNc38HRDhKQSkGp5qNl6IyIceIPwBX8z8zRkULLLDyI+Mf2qQbVK9xkdPFGRSFVYqEopCiFIVIxgKICmpUAPTimFGopAOBT0SilFKxgxSijimilYAxSiiilFFgMBT04pooAcUqenC0gGijApAVl8V4/ZwzBHLM51yIAzAdWlgFHrJ5CpbSVsuMZSfbFWzWArk/bfGupS0GhHUswH4u8QAfDQ6VaHthZ/cu+ot/8AfXPe0HEkxNxXVSALYSGiZDOxOhOneHwrF1eaP2movZrx9Lki+6SpGPdX6U4MAcvCnfb0P0oJ00HSvHk7ZpS0db7IYrMr2zupzKP4W0I9G1/z10UV597P4o2r6MdAxyN5NpJ8AYPpXolZ5xVjRyuFvs9zWw1u6FUDuZgVEEBgZgQDrqP5YmoeNpgndu2tOj9tiFGQe8Ytg3SAR7w7NtjOu8mpMAcTnCYpbZIe3D7QxBKgZBDbRqFOoGbYVr8QuYkGGtpcE3IYn/wyUiCDvB3I6V9KjBL2B4eFKAh2ubDOxDFgBoCwAzRt3hmGx2AFqBQ4VDl1XLPIxO3MrofP5CpCleli1FGHLuTANCVP/FShKRSuqZzaZDmow56URQ00UOgVjB6IGhy0cVLSGmzMv4q6MQiiMk5cumYg5JfaSBmYyDAyQd61gfv7+9aoYgMbiQWAALHK5WSGTukbEEbyeVLiHGLNkKbjwDIkAsBHUrovrvB6GuC03fk7XaVGgKRNUuH8TtYgFrThwNyJ51dmqW9oTdcjTRLTU4FNoEwqcCmUUdQyhAUa0FODSYB04oc1PNTQxzTUppUgsVKlFOqUxDAUQFGFp8tTY6BC0YFIkAEnQDUk6QOp8K4j2l9qi027BhdmubFvBOYHjueUblFxi5PRf9pfagWpt2CGubF9Cqfkz+Gw5ztXAJdOfO7EkklmJJJJESSd96jZgvlSvp3H8ifgJqJ7i18G3BFRnF/KLqYlWmDNHb6+FYeAeGjrW1ZHu+v1NeNndx/Z7fVqsf7JXiKiMx0qZjCknYAn4VAfOs0l7nlocjSvQeE49bllGZ8rFYIJ5r3SfUifWvPRFDNQ0nyN37HVcGwl204DXu3tG4ioywwkkyQ06QwEhTzkgxFXHwcFezxbqhNxsoIBJZxKlGPe3IAiDlOlV+DW7XaA22FwZkWQSr5Rp/iIuXOF01IyiliL2GfIxtMHa2xCHMVH+I0GUMgEi5MAnVdNIr6BGCXKOgwVshILhzOrBcmsD8MnKfDTfYVPk8Kg4c65O4pUAkAFs2gAggkzEcjBHQVb7Q1uh+KMk/yZEbdD2dTl/ChzDpXS2RSIckU2WpoFMU8adiohyimyCpeyNMbZosVEBtKWEgGAYkeIqYHxoCvfH8p+oqQLSitsbekNqec0opMWDABCQd2BWB5yQT6CiY9dKO5BQIFEFoslOBUspCAp4pwtEgB2P2N6hssYLTZaky0JWlYAmlFPFEtFgCBRgUQFKpsdCApxQZqKfCpGFNR3cSiwGaC2g5kmJ0A1NOWH4iB6xXJByzl3aSCRPICSAANo/v40hWQ+0/FXdzbRv8MZZ0ZS5IB7wYAwDsNtJ10jmsVZ1Xy+nP51t8XYM8gz3R1BHMAg7GI85B1mTl44HfltUKVmmHCMe+mv3vyqJnyqxY6ba0PFMV2YzRmkxHjE61zWJxb3D3j5KNh5ClJpHezXsYgBgcw+NdDYaVUgypGhrG9jPZs4292bOUUKXJABZspUZVnQE5tzMRsa6THYVLVx7STktsyAEyYU5RJ5nSvL6mHbFP5NuTqZZahJV7kN73H/AJG/2mqnDrga2hO4GU/5dPyBq5djs3j9xv8AaayeFfiXxzfHQ/QVwq8ZxRqgilSQ0tazgdH7NDDvcDYbOg7RS6ENED3lnUQByJG2gq9nxJCI9lVfs4LqRbykXGACkBlEBE6jvxEGouDcQL3BntNYZ3nKdQ5EE6QCog6GTtRrw+/3D+15rYtwcqrcNw537wZw0iCkrqBkr6BGB8m3gA4WLjZmB3gA5YETGhMzqI8hVkCoMEBlMNm1OvjpIjl5VYg1ug/SjLP8mPlphbpQaINVEBC3SKUStRVNsqkRZDTFTU80gaO4KKLg5x/KfqKlVazvaHh73msojBSrq+ckgqEdWJWNzpEbGa2ylTGe2Nx0ivlpmG3n+RqzlqK6plfP491qbkHaRBY208qUVKUoStFhQJrnsVxE4e6TlYpcjlEsNJ8OmomNYIiuiYQJOgHOuW9ocfhl9+/lKnMEDBe9BCnvd15JJkhlHeECZrjl40yomlhOPLdcBEfLqMzafu8ucHTfnpMGNjNXmvs9xBCwysbmQP7sjMAVDEa9wRlMzIGk10/tBx8YZEIBJuEopEyDkc7ESQCo3A94HapjPWynE6LN86a3dVgCpkHYjmK8m4jxnEszBWZDmuOrSsZct1AEkgzluAZtQDbUjUGi9n8XirDJN0ZCFUoRcA5IBmKZQ0ACGI7zgncSfd+A7T0l+IH9pWyB3chYnqSCQB4AKfj4Vo5q5jDYk3MZbYqUItsGVtwRnA5fx/06xXSXHVQWYgAbk1dp8E7CFV8feKW3KkBgNNuon5TWPxDjVu4sW3lROfRlmYyjvAfxaU10TbJ6qT/TNZeq6p4JqMlz+qNGDAs0HJPj/pms2pJMzrJ1PjPX+9BdICNK5gATESDAOhB0NQftCwBOs/f5VKXlSOoI5/fOukdTfyjGvyM972gK23A/CotnXMWMKoAhZncKAZ2EVDic+7qV6AgjSB133q9gsZeYS6oeTKFf3iDK59g/e2iMxAmd5faZ86W3XUHNB6hsrAa8wS/x9Bz7tGzHK2onFcXs5kPgwPyI/OsqxhB0rcxVvRh1g/1TVRErnkkex0mJTVv2Z0nsE+TF2wNmFxT/AOmzD5qKk4qf8e6ety4f62qh7NXcmKw563UX0dgh+TVYxVyXdhzZj5yxNYuol6EvkfVw7cqa8IjuHuN/Kfp/esvCJDT4EVq3fcPlHxIqPDWKzufbE4QjdiRulSVEwOoGkaUGU1zJo7LhmJv51F9ACWeWt9VAYlhmKwZI0AMiozbwZdGCl3yDKj27jCC9w6lEgbsRr59aWDuXg6K7C4rdrLkKT3UGXKwhiSZHMGrOExbO6hLGQm2pzFxCe8YAKSZ6ab178fg8965N7AuuU6ZNTpM8hrUxuR0by0qvZJjvbz4UR/T61qjwZ5LZOGEzmMRtpHntmn19KftF6/WqqNpTz51SYmixmHWnnxHxqqPCiFOxUWcxpC5G81CtwipBiI3/AF+gobBIhZx2qnmUfXnuv61dFys973+KndjuvzGuq9DU/az0qI7sbstC5UL6EHMTGbQ5Y1UkbAHSIGv4jM6RFnior17ST47a/haOhokkCbLzXAN4npO/Sub4r7RG05UlAvu5pBKvqVDLuVaIkbHQwJZaPEMO90OQzgZlGXO3Nspgj/NpMEeBmqeC9k8+QuTDJlKyQFLOVdliNQP9wjnXCUpN0jol5Klz/wDIZU5GRbgAIZl5y6lHWB+68HTUqPdmDg+0Flb+IJDl+02I72ZxDMFnZVQrqNO4J0nL2j8JwbOiMiB+8Wy5FEu2Yq3UTAjcDz05f2h4YuCto6H/ABAxSZYSiACTr72o7wg93ptDbfJXajP4aEsugYEtlysAmfvZkyMADBAZCw6SCdauY+L1wr3wiMmYCFJzMRoonMVFwAsRzGhAzVj8OQ28ShcvbkMNcxYSJUCZLA6Rz2Gm9a+C4n2GdEUZ87jPnBcQG1blJIkQxgovorsdG9Y4TKqiZlIzPbeEzIyDvo5E5h+E7hg6ASWY1s8P4AoElRDSro0sGiUUsTqxyShPOJMnUc77LcafOodkaWXKAW/CuQCYMQsAAQCImNz6XYdHUMpBB9deeo3q40xMyrOG7NbYJzEOFB5xkaAZnWefjXG8X9oXuYWziG0Lu4CDKVUqgIHuhtmGpJmToK9Bxmht9O1tz5Fo/OvK7WEMLabZRmA5DUJIHLatPTxTb+DhltJFU3nYLk2JzHzjuz8TXaYC8Xw67+4V+Er+VcthkCreB2Qg+ilvyFdHgBAKk84+/ia8n67F/c715R6P0v8A1dv8nF2bzhy3IyR8QYrosNeL2yV31AnSDWXiCqInUmP1q3wu6FLods2ceRUSPLMG+NbI82ee1s1+HYa6yaBVVyH785kYspMciJOYa9J6UftUD2CNqIuLpJJAyNz6ajfqKucKvDs9TJXNz3UN1AkQG10JgrEypMHtU6nCuQNSbbRJOgcKW1gxrBkaEAcwaiSpM64tSRwF19T5THkNh6ihSq1y6WIMEAiJIIk69Y61Mr1wm7SPovp/DX8F3CPkdH/cdW/0sD+VW11iKykfUeYq/afSeQ0+dYs+6K65bRbZZEdY+tXsPZrKbE5Spidfrp+YornFrgIAKqNJgdZ6z0rLPHKdUY4NRWyxxFMjfzCfyP0+dVO1qtfxbs2ZmYhYGp0Egzp/ppmxAHOr+20kiZK3aNLh4xLXSlrE3LBdmuBRlu24cyFUgwIg6wavYTjb9p2OftCyicyMjEKSxMjUDM5jSTm6EVkYxsPcW2iXVXKwtli6gJbLu/dJCzlzqC2nu1nrgsnZvbuMwdYaXTMAzEqrkPttIOmu29e1ejzN+x6EnG7ykIMG+rROc5AT1OQworZbEiQuknWJ106TE89ulcPa4mMDYJjtBcuW8gVsqkdm5dl0OxCAgaSQedc3i+Ou2IN9gVOVguZsuXuFYU8yDrpuTyrs8zpJJIhxp72z1m9iXCE2kW4VOq9oE8WgwRmEjQxvvVhLs9J89PQkCfUCvF+Ge0bpdLqWaZEMSxUHfWRpr05V1nB/ahBcTOhUHMpMzDkEKuoA1/eJA+FEcr4kJpHa47iKWozBzmzRlXNtE8/GqX/7HZzBSHDESFKqDHe3Bafwt8Kjx+HfEi26ZFRRcDi4xUyxTLlZA6sNG11G0Vi2bd1pNp7bLlRs6vcKMpd1yqcg70A6xzEbQSU53Uf0UoQ7bb37nXYHiCXASgYZY94DWeYgmRoasl6x/Z+1eVX7YgywyQG0WOrAZvOK1UHvb7/KAOvh866wbr1cnNpXojc99f5X+qVIWqvdaLiCd1ufI26mY/l8yKae2JrgRNA529f9rVJp4VRxOcOrkqLSK06nMSVeZGWNIWNevWm5aBLZZS2NdNNBHgCSPqanQkRA+VOzQY056eW/1Hxrm/bXiLpZCJcVHdgvVssGdz3Rtr0BA3qZSSVhRW43wRgXu2zmXusUnNBzQ2k6AxuNe6fGeP4rxU3OztKhYh8w7+kmABEdJjb8NVb94hSvaNmDBSwBB2UlGO0THdMgnry0fZvA3MwYI2ZWJzymc9xoVVbQA67jprWZtN6OqLmFttfvYdXVVJW4oAAA7pRhr+LQqddtutavEfY6QxtkqxBEaHP3W0bNuDMfE+b4qzetYjDvcOZFumCcs94qH90AagA+nx7MsKuEU20xOTPMeOYNcFkySAMqEADYmNIEknNmjUkox0/F1HB+Ni01hAUyXAxd3dRlaBk3bQt00iI3NanF+FJeElRn7kHpkfOp/wBWviBFec8H4eAwW4ArKiIUEECQZYie80NG+3np0hicppIUppK2escQunIDEZbls/8AuIPzriscsXz4Lc+Tow+prpEdv2ZA5llFsN/MjqD81rl+OYgLcvE7qbum2gBH/wAAa6432ydESVrZn3V7uLH8P1R63MDckA9VU+GomsIYlc2Jk6Mq/wCwg/WrfDMWrMEHJRv/ACg9DXm/V/Va+Eej9OSUF5t/0ZfGZVEH/nFPirkfMCruGtg5TpmI9YUTv5sNOdY3tJiJW4v4kuhh5hjB+DVNw3H5ranSVdB4lWIU/DM1dcTTin8Iw5FU2vlna4B17C26QcmjcwYYlQPGHUR0uHmBB8bXPhsQysMotk5lAAZbcuqJqYUGWJ5kxplIqHhWHHYsi6ZxdB3jMOzW35AC5r5Cdq1eJWVTDXkA7vYXEy6zBRlieskDTc02tsIfkmeM4q9GUnUTr9PLr9mrdkyoqjjlEAc5/Wfr86t4Ju6B4fTSs0/xR9D9Ofqa+C0i6jw/KpxcyiPuVH00FQrHWPH/AJpQv70xqdjt5Vmkk3s6da/Ul8BNcnx0j0Mk+sACgLkzPkfH3R+po2AI7wiI08PTpUIKdP6TSVeDFQSvO7bnaRrMAz6VGcK7a5ZkDXTXSp5UiApEwPdjcgHX1ormIIJEHSnb9kPZnqlpbdsi1dDHNNwt3bgBIlVy6EMIA0MbzuKuKuvmIhmGwESQNlViACdo5baRtXVcR4k7i0jqzCzdZ8qqiKxBIUo2aVkNMHbSqD4trhdVcWFljlOUalizHNqS0nSDoBA8fQbXuzzIYpZG+1cGbdw964xQW27QwMrEBjKhgRoANJgch1iaBLF5e41u4pKOgVQBmKqwbNIJb3WkCPdMa61tcFxa28xa4zAx77KRudAC2h2+VWbuKtl87XbgyoyoogGWVh3SCYfvtBI0mOgqVJXo75OiyRj3ft74K1pLdiwzBbebtyoZjByRLaasREbDTLVexxa45TIFRiciKiktmCxM7HVxufQ1YOLMlgo1LnKyk+9uBqBGpEET471LhrqDKMyWY1zupIHfVtIYR3kWDNNuuTL22ynOJcpaaEKEwLly2nfcicnaOoZtdlG9SYnFYnDhyLdywGjM6MxVgpkZnQbk8wddetXMR/0+3Li/LagMpR2BYBS0ADlNbFrjGG7NFDEooVEIOQXGBK5SoGiiU1194dNZWRPhP+iniaXK/slwXt7YW2vaZy+gJVR322LakRMHrtQD27tkdwFSXYy4DDLv+FtG1Xrz3may+G4qxZLf/wApct3Q1t2SFzEwSTMagwvTyqfE4627q4woBAKktduSRmlCTqTA5SN+eUV37pJaObgn7nUNxe3nQs0BLbs5KsAofsiplh5+XOpcRxe2uXvoJBPecKdCBoDGbUwY2kda5fD4t3dmKoItXIAE6gL3mbdjou+0eJoMFxN0EQraghizFtohsu/51Mss4q0rfjguMIvTZvvx5jGVGBUrnkAaltEXNv3AzmBoOYprvGWf3bTEDP7wZcxCXCohl1BgCZ3Nczi8TdulsrFbje6ba6qAwYQN2Om/LyquS6957pbulSrtzK5ZK8mnX9NKpTlJfInFIvcV4ziTfQhVQDOie6SyMyZ2J1IDDJrpEcjVDG4DEXHLs4khWPdgMQxWJJMaASdpNQ3sUjMXDgtlHIjUMCI05CRuaVvFOdmOmgMjSDIjMpG/KocXdtnWU4yio0te/kHB8OKFwzKysy6lgWntYIYzvoO9Ek7aTXScGKoQFCkJfyByxLRAUoP3lEtE9PHTlu0uJKghgIcgiCYbNIgAAzyir+AxJhGQLlDlgpEZTEECPMH4UNbshVVHV+1N1g2GCkT2wJDbRkb84+dXsTxtEPeDjoO4S2kgCH16edchfvMLqZi4lmYAliNl5HwI18qXEcGudvfAJLCHuBdddBmjc1fc02/JDiqO2/6igJEmcuYCCCenlJEAnTfXSvOcfYD4q/dzOqC7b0UsJzrrMgEQQNDHvQJAqc4Rc2fM+aIzklmjzYE1Xv4Ri4h3IYq5ZoAlW8EluUbaga6mKjk3sTjo7hOIAoqZCCWVILZoBcAyeZjMY8BXA+01xu0uhpHcJAmfezyPLWrWAzI6uMSCgcM65U7yhpYQpmd9YnWsvjd0O7NmLmG70PJ72gggBRBPXbxFdMTuW2J6CtXx3z70+MDnvWhw7FAOpXTULv1ET86wcPqpE7gesg1cw9rs4PjMeIisHXxUskk/CPS6O1iT8Nhe0BBu3QObKfkpmqAuFYAJA0Oh3g6T5Vd44QcQY2bIf6QPyqviLBISObBfj/xU4XSj/CPN6jWZr5Z6hwCCATPduMQPBrcNOuvujTTbnW3iWzIw3kTz1jUbR0G86nyrnvZ69GZeRZDM8ilzUfBPjXRI2uhPXUkeE7nw08Sa2NciR4biCqodBOgmBPgZpYJu6PX61Nxy0Fe8g2S5cUeSuVHyAqrgPd9ayzXpPc6GX+X9GlZbXafAa1KzdFbmNuvrVfD78/TzFSuTyJrK1s0dY7yL+BXrwGpDDQjUDn6+FB+1r0Py/WjZcwGs/OjtYOTtSuKWzHtgJdzaKrEyNhOxnrVpuDYpu8LF2DB93w862OGYFU1jWulTi2FAg4lARoRmXQjTpT6eUckml7EZJvGk0uTzO3YYadz6/lvUa8NaSc2hMgZTp8CK08/QH5D60s7dB8f7V6NIwRlKPDoorwnqzHWf7bxHzqwuBUENMFfHT1mpgrnpHkfqTFGEPNh9/wAtK4obnN8tgraUaz6ik9pGBBlgdDuZ+GtOcg6T5fZonYhoyFvEB4/qAp93gmgFsICCEMgZQZOg6akaaCpFt9EXXUmJJI5/Ic+VA90jcBfAn9KqNiOkHzZR+etGw0aOfTf5AD4kmoy7HUAkddh6nYVnPec8x6BT82k/OmZ2b3mJ8CSadeWFl041VPvGf4dT66gVE/Ej+FB/nJPyXLHxNVwg+5/SjVB9/wB6KQA3cU777dBop8wN6ZLbHYVZRE5z6xU63EGwn78qLEV0tkbhfjNXFJA/DApkviJ0FUcbxEEFRI8QAR8Z0+dAyfBObjsSP4fTc+ZOlPh2HaXXK5FYhlQsCRM5tQdDt4iaC2sIEXUny1JrMxxAvqFbulFgxAOhnTl7pGuulKrQHR3mR8s6hZy6sSJidzA2G3SpO3QfiOnjP1rEw1waga89OdSs07fSih2ajYxB1+Aqrf4uF2Ut6x+VUGB6moHXfeikKzJx93Pcd8pXMZgHw8KBb7jZz8ZFX7liap3MLVCGGNccgal/6oTowb/UT/aqjIRQGaTSY02uDUHEFZgzFpEbxsNvdFaNjHoYh0EEETn5GeelcwSDTFaXbHwS0m7fJ6dwvjqI2aUJ0gL4NmIkqTBhdBHnWxiPa21laBllSARmJUkESoVZ5zH614yCRsant4+4mzEeRqnbBJG7xy4l29cdFYK7EhVVgAJmACsgAmqnDsNchu4/L8LePhUC8buDdj6gVIeNMR7xHWCR9K5yhao1YeoeOSlXBpZGQZmBWTlGZSPHmKNniNQRvWQcYG95m+M0kyzox+lcXgOs+r75d0kb+FUtP397Vr4ayBXM4XFsm0mYmfDpVtOMOOvwH6Vky9LOT0Us8UddarzrF8CxLu7dk3eZjy5knrW6nGB+Jj5Tp8jVz/rg+/8AmunS4J4W79zlmyxnRmPiAOmtCmL00megFZoHl9+c0QHn8a39vkzWXGxR5mPMk/SaE4weJ8oH1qqFFPlFCjFCtk37aw2gHrEn0nb0qN7zN7zE89STTEeFEBV2IFVHOjHlSyUSpPjSAQNGKk7I7xHidP8AmpEw5OsaD0/OflSsCFV6CpFEb6elTZPLz0P5moWY9J5zr+tAxFztPp+tCEJ5/Sjtx0jwgnzp8Q6xuPhOvrrFAFXGXwNFIMdQNao4UZnB5DX9KV/vEx9ir+CQKk9d6BG1wbAdq+YuqquuuYE9YhSPSRWL7RsnaIyJlVpUCIMKRPl3neesCtTg6yxkEqRBiIjnv661n+1zoTZNsDKAyiDIlSrHX/N9kVXsL3IsxHejVdYGvnv8KuEjpvrVS0+gInXb7mraKSsRqm0ayPT7kVJQWQHb7+FA9odKmsOY/SpGk1IFM2R+79aiewI92rheP0oWc0AUHw4P4RVW5g/4a1mf7ionJ607Aw7mD8KqvhyK6Bm+9KgZZp2Iw9t6QNab2RVV8NRYFYgULrUjWiKFlNMCMCnDkUhpTM1AEq4hhGtW7XEDEfc1nUooA17XEMx1A8qL9uH7g+NY0UqVIdm5lNGs+FKlTEEqmiC0qVIAgv3NSi2fL0+nWlSoAlS16/IeUnarGHU9G9D+lKlQMnJ6qwPn+Yqq7seo8NZHy2pUqkYuzduflqZ+/SmGDaTJIHOOfodaVKqEK4VTY+mcaff51lYnE5uX39aVKgCKxbLMB11Pl6VsWMMWYCYpUqa5EdgvALQTLrLASx1kcxG0RpXOe32GRLVlUUCGcT4BV/t8KelXaUVRC5Mnh6Z0G8wJ+QMetSq+RpOaT3SIPXTYH7PnCpVnfJ0L/ZDkdPuacWzH96elSGAbBNJsMRTUqAG/ZSPD78qifDnp9aVKgARaoHw/hSpUAQtZFV3tDrSpUCIHsVEbRHjSpUAQsnh8qhewOQp6VUBA1hhyqOIpUqYhTSmlSoA//9k=',
                state: '2',
                name: 'Donde tu quieras',
                description: 'Recibe tus productos en todo Manta',
              },
            ]}
          />
          {favoritesData && !isLoadingFavorites && !isValidatingFavorites && (
            <>
              <View style={{height: normalize(20)}} />
              <ProductsSlider data={favoritesData} />
            </>
          )}

          {products && !isLoading && !isValidating && (
            <>
              <View style={{height: normalize(20)}} />
              <MostPopular products={products} />
            </>
          )}
        </View>
      </ScrollView>
    </Wrapper>
  );
}
