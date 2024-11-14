-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 14 Lis 2024, 22:59
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `ebazar`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint(20) NOT NULL,
  `street` varchar(255) NOT NULL,
  `house_number` varchar(255) NOT NULL,
  `flat_number` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `addresses`
--

INSERT INTO `addresses` (`address_id`, `street`, `house_number`, `flat_number`, `postal_code`, `city`, `user_id`) VALUES
(3, 'Joanny Żubrowej', '13', '12', '94-025', 'Łódź', 3),
(4, 'Lodowa', '103', '12', '94-025', 'Łódź', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`) VALUES
(1, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`) VALUES
(37, 1, 110, 1),
(38, 1, 112, 2),
(39, 1, 123, 1),
(40, 1, 116, 1),
(41, 1, 117, 1),
(42, 1, 119, 1),
(43, 1, 120, 2),
(44, 2, 117, 1),
(46, 2, 120, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Sporty'),
(2, 'Kobiety'),
(3, 'Mężczyźni'),
(4, 'Dzieci');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourites`
--

CREATE TABLE `favourites` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `favourites`
--

INSERT INTO `favourites` (`user_id`, `product_id`) VALUES
(4, 49);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(13,2) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total`, `payment_id`, `created_at`, `status`) VALUES
(6, 3, '780.00', 'pm_1PjnmRISwy2ghL1I265GoTN2', '2024-08-03 21:38:23', 'opłacone'),
(7, 4, '460.00', 'pm_1PjoLYISwy2ghL1IOSW8MVQl', '2024-08-03 22:14:40', 'opłacone'),
(8, 4, '700.00', 'pm_1PpYrhISwy2ghL1IV6eaqitX', '2024-08-19 18:55:37', 'opłacone'),
(9, 4, '700.00', 'pm_1Ppz0OISwy2ghL1IeyqnJRbE', '2024-08-20 22:50:20', 'opłacone');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(6, 6, 110, 1),
(7, 6, 112, 2),
(8, 6, 123, 1),
(9, 6, 116, 1),
(10, 6, 117, 1),
(11, 6, 119, 1),
(12, 6, 120, 2),
(13, 7, 117, 1),
(14, 7, 118, 1),
(15, 7, 120, 1),
(16, 7, 121, 1),
(17, 8, 117, 1),
(18, 8, 120, 6),
(19, 9, 117, 1),
(20, 9, 120, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(13,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `category_id`, `subcategory_id`, `color`, `size`, `brand`, `img`) VALUES
(1, 'Piłka nożna adidas Brazuca', '150.00', 1, 1, 'Multikolor', '5', 'adidas', '/images/products/football/balls/adidas_brazuca.jpg'),
(3, 'Piłka nożna Puma Orbita', '160.00', 1, 1, 'Multikolor', '5', 'Puma', '/images/products/football/balls/puma_orbita.jpg'),
(4, 'Rękawice adidas Predator', '240.00', 1, 1, 'Multikolor', '10.5', 'adidas', '/images/products/football/gloves/adidas_predator.jpg'),
(5, 'Rękawice Nike Match', '78.00', 1, 1, 'Bialy', '9', 'Nike', '/images/products/football/gloves/nike_match.jpg'),
(6, 'Rękawice Puma Ultra', '365.00', 1, 1, 'Pomaranczowy', '10.5', 'Puma', '/images/products/football/gloves/puma_ultra_ultimate.jpg'),
(7, 'Korki Puma Future Match', '280.00', 1, 1, 'Pomaranczowy', '40', 'Puma', '/images/products/football/boots/puma_future_match.jpg'),
(8, 'Korki adidas X Crazyfast', '340.00', 1, 1, 'Niebieski', '42', 'adidas', '/images/products/football/boots/adidas_x_crazyfast.jpg'),
(9, 'Korki Nike Zoom Vapor', '355.00', 1, 1, 'Zielony', '42', 'Nike', '/images/products/football/boots/nike_zoom_vapor.jpg'),
(10, 'Piłka do koszykówki Wilson NBA Authentic', '167.00', 1, 4, 'Pomaranczowy', '7', 'Wilson', '/images/products/basketball/balls/wilson_nba_authentic.jpg'),
(11, 'Piłka do koszykówki Spalding Marble Series', '110.00', 1, 4, 'Multikolor', '7', 'Spalding', '/images/products/basketball/balls/spalding_marble_series.jpg'),
(12, 'Piłka do koszykówki Air Jordan Ultimate', '179.00', 1, 4, 'Bialy', '7', 'Jordan', '/images/products/basketball/balls/air_jordan_ultimate.jpg'),
(13, 'Koszulka męska Nike New Orleans', '350.00', 1, 4, 'Niebieski', 'M', 'Nike', '/images/products/basketball/shirts/nike_new_orleans.jpg'),
(14, 'Koszulka męska Mitchell & Ness Lakers', '200.00', 1, 4, 'Multikolor', 'XXL', 'Mitchell&Ness', '/images/products/basketball/shirts/mitchell_and_ness_lakers.jpg'),
(15, 'Koszulka męska Spalding Reversible', '130.00', 1, 4, 'Niebieski', 'M', 'Spalding', '/images/products/basketball/shirts/spalding_reversible.jpg'),
(16, 'Buty męskie Fila Breakaway', '153.00', 1, 4, 'Bialy', '43', 'Fila', '/images/products/basketball/boots/fila_breakaway.jpg'),
(18, 'Buty męskie Under Armour Lockdown', '200.00', 1, 4, 'Bialy', '45', 'UnderArmour', '/images/products/basketball/boots/under_armour_lockdown.jpg'),
(19, 'Buty męskie Puma Playmaker', '190.00', 1, 4, 'Bialy', '45', 'Puma', '/images/products/basketball/boots/puma_playmaker.jpg'),
(20, 'Tarcza Bulls Shark Pro', '239.00', 1, 5, 'Czarny', '45cm', 'Bulls', '/images/products/dart/boards/bulls_shark_pro.jpg'),
(21, 'Tarcza Shot Bully Boy', '315.00', 1, 5, 'Czarny', '45 cm', 'Shot', '/images/products/dart/boards/shot_bully_boy.jpg'),
(23, 'Tarcza Target Aspar', '450.00', 1, 5, 'Czarny', '45cm', 'Target', '/images/products/dart/boards/target_aspar.jpg'),
(24, 'Lotki 3 szt. Target Brass Soft', '125.00', 1, 5, 'Niebieski', '18g', 'Target', '/images/products/dart/darts/target_brass_soft.jpg'),
(25, 'Lotki 3 szt. Unicorn T80 Striker S4', '245.00', 1, 5, 'Czerwony', '23g', 'Unicorn', '/images/products/dart/darts/unicorn_t80_striker_s4.jpg'),
(26, 'Lotki 3 szt. Bulls Aubergenius SC', '135.00', 1, 5, 'Fioletowy', '21g', 'Bulls', '/images/products/dart/darts/bulls_aubergenius_sc.jpg'),
(27, 'Piórka 3 szt. Target ID Pro', '9.00', 1, 5, 'Niebieski', '100um', 'Target', '/images/products/dart/feathers/target_id_pro.jpg'),
(28, 'Piórka 3 szt. Bulls Nylon Pink', '9.00', 1, 5, 'Rozowy', '150um', 'Bulls', '/images/products/dart/feathers/bulls_nylon_pink.jpg'),
(29, 'Piórka 3 szt. Shot Zen Enso', '8.00', 1, 5, 'Czerwony', '100um', 'Shot', '/images/products/dart/feathers/shot_zen_enso.jpg'),
(30, 'Piłka do siatkówki Mikasa V330W Light', '170.00', 1, 2, 'Zolty', '5', 'Mikasa', '/images/products/volleyball/balls/mikasa_v330w_light.jpg'),
(31, 'Piłka do siatkówki Molten V4M4500', '190.00', 1, 2, 'Multikolor', '4', 'Molten', '/images/products/volleyball/balls/molten_v4m4500.jpg'),
(32, 'Piłka do siatkówki Wilson Mr Castaway', '75.00', 1, 2, 'Bialy', '5', 'Wilson', '/images/products/volleyball/balls/wilson_mr_castaway.jpg'),
(33, 'Nakolanniki 2 szt. Asics Basic ', '70.00', 1, 2, 'Bialy', 'L', 'Asics', '/images/products/volleyball/kneepads/asics_basic.jpg'),
(35, 'Nakolanniki 2 szt. Errea Tokio', '150.00', 1, 2, 'Bialy', 'M', 'Errea', '/images/products/volleyball/kneepads/errea_tokio.jpg'),
(36, 'Nakolanniki 2 szt. Kipsta Allsix', '70.00', 1, 2, 'Czarny', 'L', 'Kipsta', '/images/products/volleyball/kneepads/kipsta_allsix.jpg'),
(37, 'Rękawki Allsix VAP500', '50.00', 1, 2, 'Czarny', '1', 'Allsix', '/images/products/volleyball/sleeves/allsix_vap500.jpg'),
(38, 'Rękawki JG Team Termoactiv', '35.00', 1, 2, 'Bialy', 'L', 'JGTeam', '/images/products/volleyball/sleeves/jg_team_termoactiv.jpg'),
(39, 'Rękawki JG Team Bioactiv', '42.00', 1, 2, 'Zielony', 'M', 'JGTeam', '/images/products/volleyball/sleeves/jg_team_bioactiv.jpg'),
(40, 'Buty męskie Saucony Axon 2', '340.00', 1, 3, 'Pomaranczowy', '42', 'Saucony', '/images/products/running/boots/saucony_axon_2.jpg'),
(41, 'Buty męskie Asics Gel Quantum 180', '400.00', 1, 3, 'Czarny', '42', 'Asics', '/images/products/running/boots/asics_gel_quantum_180.jpg'),
(42, 'Buty męskie Salomon Trailster 2', '270.00', 1, 3, 'Czarny', '45', 'Salomon', '/images/products/running/boots/salomon_trailster_2.jpg'),
(43, 'Koszulka męska ROXX Compression', '70.00', 1, 3, 'Czarny', 'XL', 'ROXX', '/images/products/running/shirts/roxx_compression_shirt.jpg'),
(44, 'Koszulka damska Brubeck Dry', '116.00', 1, 3, 'Czarny', 'M', 'Brubeck', '/images/products/running/shirts/brubeck_dry.jpg'),
(45, 'Koszulka męska Rogelli Merino', '300.00', 1, 3, 'Czarny', 'XL', 'Rogelli', '/images/products/running/shirts/rogelli_merino.jpg'),
(46, 'Bidon Powergym 750 ml', '20.00', 1, 3, 'Bialy', '750ml', 'Powergym', '/images/products/running/bottles/powergym_750ml.jpg'),
(47, 'Bidon Rogelli Enjoy 500 ml', '40.00', 1, 3, 'Niebieski', '500ml', 'Rogelli', '/images/products/running/bottles/rogelli_500ml.jpg'),
(48, 'Bidon Camelbak Podium 620ml', '75.00', 1, 3, 'Szary', '620ml', 'Camelbak', '/images/products/running/bottles/camelbak_620ml.jpg'),
(49, 'Bluzka damska adidas HS5283', '65.00', 2, 6, 'Rozowy', 'S', 'adidas', '/images/products/women/shirts/adidas_hs5283.jpg'),
(50, 'Bluzka damska adidas Own The Run', '150.00', 2, 6, 'Rozowy', 'S', 'adidas', '/images/products/women/shirts/adidas_own_the_run.jpg'),
(51, 'Bluzka damska Nike Dry Park VII', '90.00', 2, 6, 'Zielony', 'M', 'Nike', '/images/products/women/shirts/nike_dry_park_vii.jpg'),
(52, 'Bluzka damska Mizuno Impulse Core', '70.00', 2, 6, 'Niebieski', 'M', 'Mizuno', '/images/products/women/shirts/mizuno_impulse_core.jpg'),
(53, 'Bluzka damska Mizuno Core Graphic', '100.00', 2, 6, 'Niebieski', 'L', 'Mizuno', '/images/products/women/shirts/mizuno_core_graphic.jpg'),
(54, 'Bluzka damska Mizuno Max Support', '60.00', 2, 6, 'Czarny', 'L', 'Mizuno', '/images/products/women/shirts/mizuno_max_support.jpg\r\n'),
(55, 'Kurtka damska Newline Comfort', '200.00', 2, 9, 'Niebieski', 'L', 'Newline', '/images/products/women/jackets/newline_comfort.jpg'),
(56, 'Kurtka damska Mizuno Reflect Wind', '250.00', 2, 9, 'Czarny', 'L', 'Mizuno', '/images/products/women/jackets/mizuno_reflect_wind.jpg'),
(57, 'Kurtka damska adidas Windbreaker', '230.00', 2, 9, 'Fioletowy', 'M', 'adidas', '/images/products/women/jackets/adidas_windbreaker.jpg'),
(58, 'Kurtka damska Hi-Tec Lady Helmer', '300.00', 2, 9, 'Niebieski', 'M', 'Hi-Tec', '/images/products/women/jackets/hi_tec_lady_helmer.jpg'),
(59, 'Kurtka damska Litio W Jacket', '235.00', 2, 9, 'Niebieski', 'L', 'Litio', '/images/products/women/jackets/litio_w_jacket.jpg'),
(60, 'Kurtka damska Ronhill Afterhours Jacket', '255.00', 2, 9, 'Fioletowy', 'L', 'Ronhill', '/images/products/women/jackets/ronhill_afterhours_jacket.jpg\r\n'),
(61, 'Spodenki damskie Nike Dri-Fit Park', '95.00', 2, 8, 'Czarny', 'M', 'Nike', '/images/products/women/shorts/nike_dri_fit_park.jpg'),
(62, 'Spodenki damskie Under Armour Fly-By 2.0', '98.00', 2, 8, 'Czarny', 'L', 'UnderArmour', '/images/products/women/shorts/ua_fly_by_2_0.jpg'),
(63, 'Spodenki damskie Puma Varsity', '66.00', 2, 8, 'Czarny', 'S', 'Puma', '/images/products/women/shorts/puma_varsity.jpg'),
(64, 'Spodenki damskie Nike Academy', '63.00', 2, 8, 'Niebieski', 'M', 'Nike', '/images/products/women/shorts/nike_academy.jpg'),
(65, 'Spodenki damskie Hi-Tec Laria', '80.00', 2, 8, 'Czerwony', 'S', 'Hi-Tec', '/images/products/women/shorts/hi_tec_laria.jpg'),
(66, 'Spodenki damskie Reebok Epic Oil', '55.00', 2, 8, 'Multikolor', 'XS', 'Reebok', '/images/products/women/shorts/reebook_epic_oil.jpg'),
(67, 'Spodnie damskie Nike Dri-Fit Academy', '110.00', 2, 7, 'Niebieski', 'L', 'Nike', '/images/products/women/trousers/nike_dri_fit_academy.jpg'),
(68, 'Spodnie damskie Champion Slim', '120.00', 2, 7, 'Czerwony', 'S', 'Champion', '/images/products/women/trousers/champion_slim.jpg'),
(69, 'Spodnie damskie Puma Evostripe', '120.00', 2, 7, 'Szary', 'M', 'Puma', '/images/products/women/trousers/puma_evostripe.jpg'),
(70, 'Spodnie damskie Salewa Lavaredo Hemp', '420.00', 2, 7, 'Czerwony', 'L', 'Salewa', '/images/products/women/trousers/salewa_lavaredo_hemp.jpg'),
(71, 'Spodnie damskie Under Armour Motion', '240.00', 2, 7, 'Czarny', 'XL', 'UnderArmour', '/images/products/women/trousers/ua_motion.jpg'),
(72, 'Spodnie damskie Hi-Tec Lady Lupin', '200.00', 2, 7, 'Niebieski', 'M', 'Hi-Tec', '/images/products/women/trousers/hi_tec_lady_lupin.jpg'),
(73, 'Buty damskie Asics Gel-Exite', '345.00', 2, 10, 'Niebieski', '40', 'Asics', '/images/products/women/boots/asics_gel_exite.jpg'),
(74, 'Buty damskie adidas Tracefinder', '170.00', 2, 10, 'Niebieski', '41', 'adidas', '/images/products/women/boots/adidas_tracefinder.jpg'),
(75, 'Buty damskie Salomon Kaneo W', '295.00', 2, 10, 'Niebieski', '41', 'Salomon', '/images/products/women/boots/salomon_kaneo_w.jpg'),
(76, 'Buty damskie Under Armour Charged', '210.00', 2, 10, 'Niebieski', '42', 'UnderArmour', '/images/products/women/boots/ua_w_charged_pursuit.jpg'),
(77, 'Buty damskie Puma All-Day Active', '140.00', 2, 10, 'Czarny', '42', 'Puma', '/images/products/women/boots/puma_all_day_active.jpg'),
(78, 'Buty damskie adidas Response Super 3.0', '220.00', 2, 10, 'Niebieski', '40', 'adidas', '/images/products/women/boots/adidas_response_super_3_0.jpg'),
(79, 'Bluzka męska adidas Entrada', '50.00', 3, 6, 'Niebieski', 'XL', 'adidas', '/images/products/men/shirts/adidas_entrada.jpg'),
(80, 'Bluzka męska Hi-Tec Hicti', '70.00', 3, 6, 'Niebieski', 'L', 'Hi-Tec', '/images/products/men/shirts/hi_tec_hicti.jpg'),
(81, 'Bluzka męska IQ Erino', '80.00', 3, 6, 'Niebieski', 'XL', 'IQ', '/images/products/men/shirts/iq_erino.jpg\r\n'),
(82, 'Bluzka męska Hi-Tec Hadi', '100.00', 3, 6, 'Czerwony', 'L', 'Hi-Tec', '/images/products/men/shirts/hi_tec_hadi.jpg'),
(83, 'Bluzka męska Puma Run Favourite', '110.00', 3, 6, 'Zolty', 'M', 'Puma', '/images/products/men/shirts/puma_run_favourite.jpg'),
(84, 'Bluzka męska Hummel Core Poly', '54.00', 3, 6, 'Niebieski', 'XL', 'Hummel', '/images/products/men/shirts/hummel_core_poly.jpg'),
(85, 'Spodnie męskie Puma teamRise', '102.00', 3, 7, 'Czarny', 'XL', 'Puma', '/images/products/men/trousers/puma_team_rise.jpg'),
(86, 'Spodnie męskie adidas Tiro', '163.00', 3, 7, 'Niebieski', 'M', 'adidas', '/images/products/men/trousers/adidas_tiro.jpg'),
(87, 'Spodnie męskie Puma Active', '124.00', 3, 7, 'Czarny', 'XL', 'Puma', '/images/products/men/trousers/puma_active.jpg'),
(88, 'Spodnie męskie Jako Classico', '136.00', 3, 7, 'Niebieski', 'L', 'Jako', '/images/products/men/trousers/jako_classico.jpg'),
(89, 'Spodnie męskie Huari Ziptos', '51.00', 3, 7, 'Niebieski', 'M', 'Huari', '/images/products/men/trousers/huari_ziptos.jpg'),
(90, 'Spodnie męskie Martes Malter', '90.00', 3, 7, 'Niebieski', 'XL', 'Martes', '/images/products/men/trousers/martes_malter.jpg'),
(91, 'Spodenki męskie adidas Tiro', '115.00', 3, 8, 'Niebieski', 'M', 'adidas', '/images/products/men/shorts/adidas_tiro.jpg'),
(92, 'Spodenki męskie Martes Liberos', '45.00', 3, 8, 'Czarny', 'L', 'Martes', '/images/products/men/shorts/martes_liberos.jpg'),
(93, 'Spodenki męskie adidas Parma', '60.00', 3, 8, 'Czarny', 'M', 'adidas', '/images/products/men/shorts/adidas_parma.jpg'),
(94, 'Spodenki męskie Kappa Topen', '90.00', 3, 8, 'Szary', 'XL', 'Kappa', '/images/products/men/shorts/kappa_topen.jpg'),
(95, 'Spodenki męskie Joma Treviso', '56.00', 3, 8, 'Bialy', 'M', 'Joma', '/images/products/men/shorts/joma_treviso.jpg'),
(96, 'Spodenki męskie Puma Essentials', '100.00', 3, 8, 'Czarny', 'XL', 'Puma', '/images/products/men/shorts/puma_essentials.jpg'),
(97, 'Kurtka męska Hi-Tec Zoe II', '80.00', 3, 9, 'Czarny', 'L', 'Hi-Tec', '/images/products/men/jackets/hi_tec_zoe_ii.jpg'),
(98, 'Kurtka męska Softshell Elbrus', '176.00', 3, 9, 'Czarny', 'L', 'Softshell', '/images/products/men/jackets/softshell_elbrus.jpg'),
(99, 'Kurtka męska Puma Spirit', '130.00', 3, 9, 'Czarny', 'XL', 'Puma', '/images/products/men/jackets/puma_spirit.jpg'),
(100, 'Kurtka męska Lonsdale Wind Runner', '90.00', 3, 9, 'Czarny', 'L', 'Lonsdale', '/images/products/men/jackets/lonsdale_wind_runner.jpg'),
(101, 'Kurtka męska 4F H4Z17', '220.00', 3, 9, 'Szary', 'L', '4F', '/images/products/men/jackets/4f_h4z17.jpg'),
(102, 'Kurtka męska adidas Core', '110.00', 3, 9, 'Czarny', 'XL', 'adidas', '/images/products/men/jackets/adidas_core.jpg'),
(103, 'Buty męskie Nike Revolution 6', '240.00', 3, 10, 'Czarny', '46', 'Nike', '/images/products/men/boots/nike_revolution_6.jpg'),
(104, 'Buty męskie New Balance GM500EN2', '370.00', 3, 10, 'Niebieski', '45', 'NewBalance', '/images/products/men/boots/new_balance_gm500en2.jpg'),
(105, 'Buty męskie Reebok Flexagon', '200.00', 3, 10, 'Niebieski', '44', 'Reebok', '/images/products/men/boots/reebok_flexagon.jpg'),
(106, 'Buty męskie Puma Varion', '152.00', 3, 10, 'Niebieski', '43', 'Puma', '/images/products/men/boots/puma_varion.jpg'),
(108, 'Buty męskie Asics Court Slide', '203.00', 3, 10, 'Niebieski', '45', 'Asics', '/images/products/men/boots/asics_court_slide.jpg'),
(109, 'Buty męskie Under Armour Surge', '210.00', 3, 10, 'Czarny', '45', 'UnderArmour', '/images/products/men/boots/ua_surge.jpg'),
(110, 'Bluzka dziecięca Puma ESS', '44.00', 4, 6, 'Zielony', 'M', 'Puma', '/images/products/kids/shirts/puma_ess.jpg'),
(111, 'Bluzka dziecięca Zina Contra', '60.00', 4, 6, 'Niebieski', 'L', 'Zina', '/images/products/kids/shirts/zina_contra.jpg'),
(112, 'Bluzka dziecięca Nike Jordan Air', '108.00', 4, 6, 'Czarny', 'M', 'Nike', '/images/products/kids/shirts/jordan_air.jpg'),
(113, 'Bluzka dziecięca adidas Manchester United', '350.00', 4, 6, 'Czerwony', 'L', 'adidas', '/images/products/kids/shirts/adidas_mu.jpg'),
(114, 'Bluzka dziecięca Bejo Twotone JRB', '40.00', 4, 6, 'Czarny', 'L', 'Bejo', '/images/products/kids/shirts/bejo_twotone_jrb.jpg'),
(115, 'Bluzka dziecięca O\'Neill Wave', '90.00', 4, 6, 'Bialy', 'S', 'O\'Neill', '/images/products/kids/shirts/o_neill_wave.jpg'),
(116, 'Spodnie dziecięce Bejo Royce', '60.00', 4, 7, 'Zielony', 'L', 'Bejo', '/images/products/kids/trousers/bejo_royce.jpg'),
(117, 'Spodnie dziecięce O\'Neill Rutile Jogger', '100.00', 4, 7, 'Czarny', 'L', 'O\'Neill', '/images/products/kids/trousers/o_neill_rutile_jogger.jpg'),
(118, 'Spodnie dziecięce Puma Power Graphic', '160.00', 4, 7, 'Niebieski', 'M', 'Puma', '/images/products/kids/trousers/puma_power_graphic.jpg'),
(119, 'Spodnie dziecięce IQ Mellar II', '100.00', 4, 7, 'Niebieski', 'L', 'IQ', '/images/products/kids/trousers/iq_mellar_ii.jpg'),
(120, 'Spodnie dziecięce Hi-Tec Omio', '100.00', 4, 7, 'Czarny', 'XL', 'Hi-Tec', '/images/products/kids/trousers/hi_tec_omio.jpg'),
(121, 'Spodnie dziecięce Bejo Talago', '100.00', 4, 7, 'Niebieski', 'M', 'Bejo', '/images/products/kids/trousers/bejo_talago.jpg'),
(122, 'Spodenki dziecięce Kappa Italo', '90.00', 4, 8, 'Zielony', 'S', 'Kappa', '/images/products/kids/shorts/kappa_italo.jpg'),
(123, 'Spodenki dziecięce 4F M047', '60.00', 4, 8, 'Lososiowy', 'L', '4F', '/images/products/kids/shorts/4f_m047.jpg'),
(124, 'Spodenki dziecięce adidas Marvel Avengers', '118.00', 4, 8, 'Multikolor', 'M', 'adidas', '/images/products/kids/shorts/adidas_marvel_avengers.jpg'),
(125, 'Spodenki dziecięce Puma teamRISE Jr', '62.00', 4, 8, 'Czerwony', 'L', 'Puma', '/images/products/kids/shorts/puma_team_rise_jr.jpg'),
(126, 'Spodenki dziecięce Nike Junior Dry Park', '66.00', 4, 8, 'Niebieski', 'L', 'Nike', '/images/products/kids/shorts/nike_junior_dry_park.jpg'),
(127, 'Spodenki dziecięce adidas Performance Jr', '87.00', 4, 8, 'Niebieski', 'L', 'adidas', '/images/products/kids/shorts/adidas_performance_jr.jpg'),
(128, 'Kurtka dziecięca Softshell Windbarrier', '200.00', 4, 9, 'Zielony', 'M', 'Softshell', '/images/products/kids/jackets/softshell_windbarrier.jpg'),
(129, 'Kurtka dziecięca Alpine Pro Spino', '150.00', 4, 9, 'Zielony', 'L', 'Alpine', '/images/products/kids/jackets/alpine_pro_spino.jpg'),
(130, 'Kurtka dziecięca Givova Basico', '80.00', 4, 9, 'Niebieski', 'M', 'Givova', '/images/products/kids/jackets/givova_basico.jpg'),
(131, 'Kurtka dziecięca Jako Ortalion Power', '230.00', 4, 9, 'Zielony', 'L', 'Jako', '/images/products/kids/jackets/jako_ortalion_power.jpg'),
(132, 'Kurtka dziecięca Nike Jr RPL Park', '134.00', 4, 9, 'Zolty', 'XL', 'Nike', '/images/products/kids/jackets/nike_jr_rpl_park.jpg'),
(133, 'Kurtka dziecięca Pitbull Athletic Sleeve', '160.00', 4, 9, 'Niebieski', 'L', 'Pitbull', '/images/products/kids/jackets/pitbull_athletic_sleeve.jpg'),
(134, 'Buty dziecięce Puma Anzarun Lite', '94.00', 4, 10, 'Rozowy', '32', 'Puma', '/images/products/kids/boots/puma_anzarun_lite.jpg'),
(135, 'Buty dziecięce Vans YT Ward', '160.00', 4, 10, 'Czarny', '33', 'Vans', '/images/products/kids/boots/vans_yt_ward.jpg'),
(136, 'Buty dziecięce New Balance YV373AI2', '200.00', 4, 10, 'Niebieski', '30', 'NewBalance', '/images/products/kids/boots/new_balance_YV373AI2.jpg'),
(137, 'Buty dziecięce Newfeel PW 100', '70.00', 4, 10, 'Szary', '30', 'Newfeel', '/images/products/kids/boots/newfeel_pw_100.jpg'),
(138, 'Buty dziecięce Hummel Actus', '90.00', 4, 10, 'Czarny', '29', 'Hummel', '/images/products/kids/boots/hummel_actus.jpg'),
(139, 'Buty dziecięce Under Armour Lockdown Jr', '139.00', 4, 10, 'Bialy', '32', 'UnderArmour', '/images/products/kids/boots/ua_lockdown_jr.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subcategories`
--

CREATE TABLE `subcategories` (
  `subcategory_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `subcategories`
--

INSERT INTO `subcategories` (`subcategory_id`, `name`) VALUES
(1, 'Piłka nożna'),
(2, 'Siatkówka'),
(3, 'Bieganie'),
(4, 'Koszykówka'),
(5, 'Dart'),
(6, 'Bluzki'),
(7, 'Spodnie'),
(8, 'Spodenki'),
(9, 'Kurtki'),
(10, 'Buty');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `role`) VALUES
(3, 'jakand@wp.pl', '$2a$10$pxAj8XW885xfv6D2JidPcu7AlyKY4DO494sOlV.Uhqks0sEHOQr.i', 'Jakub', 'Andriej', '123456789', 'user'),
(4, '123@wp.pl', '$2a$10$o65Zo79Si2Ig4GLYu45dye6Og5c0DRCmzlb5y3Sg5aCSbUuks9lcC', 'Jakub', 'Andriej', '512 345 678', 'admin');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeksy dla tabeli `favourites`
--
ALTER TABLE `favourites`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indeksy dla tabeli `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`subcategory_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT dla tabeli `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Ograniczenia dla tabeli `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Ograniczenia dla tabeli `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
