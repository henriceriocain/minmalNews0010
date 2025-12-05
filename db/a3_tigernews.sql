-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 13, 2025 at 01:28 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tigernews`
--
CREATE DATABASE IF NOT EXISTS `tigernews` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tigernews`;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `a_id` int(10) UNSIGNED NOT NULL,
  `a_slug` varchar(160) NOT NULL,
  `a_title` varchar(256) NOT NULL,
  `a_teaser` text NOT NULL,
  `a_content` mediumtext NOT NULL,
  `is_premium` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`a_id`, `a_slug`, `a_title`, `a_teaser`, `a_content`, `is_premium`, `created_at`, `updated_at`) VALUES
(1, 'climate-report-2025', 'Climate Report 2025 Released by International Research Group', 'This year\'s climate report highlights shifting weather patterns around the world...', 'This year\'s climate report highlights shifting weather patterns around the world. Researchers note rising sea levels, increased frequency of heatwaves, and intensified storms in coastal regions. The report urges governments to accelerate adaptation plans, invest in sustainable infrastructure, and support vulnerable communities.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(2, 'local-artist-renovates-old-library', 'Local Artist Leads Renovation of Historic Library', 'A once abandoned library has been transformed into a vibrant art hub...', 'A once abandoned library has been transformed into a vibrant art hub thanks to the efforts of local artist Maya Tan. The space now hosts exhibitions, community workshops, and a small makerspace. Residents say the project has revitalized the neighbourhood and encouraged more youth engagement.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(3, 'tech-startup-launches-ai-tutor', 'Tech Startup Launches AI Tutor for Students', 'A Halifax based startup has launched an AI tutor designed to support student learning...', 'A Halifax based startup has launched an AI tutor designed to support student learning in STEM fields. The platform adapts its questions based on student progress and provides targeted feedback. Early studies suggest that learners using the tool show improved problem solving and concept mastery.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(4, 'community-garden-expands', 'Community Garden Expands After Record Participation', 'Thanks to community volunteers, the local garden is doubling in size...', 'Thanks to community volunteers, the local garden is doubling in size. This year, more than one hundred residents signed up to help maintain plots, plant vegetables, and offer educational gardening sessions. Organizers plan to introduce composting workshops next season.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(5, 'new-astronomy-discovery', 'Astronomers Discover Unusual Exoplanet in Nearby System', 'A team of astronomers has identified an exoplanet with unexpected atmospheric patterns...', 'A team of astronomers has identified an exoplanet with unexpected atmospheric patterns. The planet appears to contain swirling cloud structures unlike those seen in our solar system. Scientists are now studying its orbit, chemical composition, and potential for extreme weather behaviour.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(6, 'transportation-upgrades-approved', 'Province Approves Major Transportation Upgrades', 'The government has announced a multi year plan to improve transit routes...', 'The government has announced a multi year plan to improve transit routes and increase bike lane access across urban centres. Funding will support new buses, upgraded terminals, and environmentally friendly infrastructure. Officials say the improvements will reduce commute times and emissions.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(7, 'wildlife-rescue-milestone', 'Wildlife Rescue Centre Celebrates Milestone', 'The local wildlife rescue centre has treated more animals this year than ever before...', 'The local wildlife rescue centre has treated more animals this year than ever before. Staff attribute the increase to improved public awareness and rapid reporting of injured animals. Volunteers are currently being trained to support expanded rehabilitation programs.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(8, 'new-culinary-trend-2025', 'Chefs Embrace New Culinary Trend for 2025', 'A new culinary trend focused on fermented flavours is gaining attention...', 'A new culinary trend focused on fermented flavours is gaining attention in top restaurants. Chefs are experimenting with kombucha reductions, miso infused broths, and probiotic rich garnishes. Food critics say this shift reflects a growing interest in gut health and sustainable food practices.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(9, 'campus-mental-health-initiative', 'Universities Launch Collaborative Mental Health Initiative', 'Six universities are partnering to create shared mental health resources...', 'Six universities are partnering to create shared mental health resources to support student well being. The initiative includes expanded counselling services, peer support networks, and training sessions for faculty. Organizers hope to reduce stigma and improve accessibility.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(10, 'renewable-energy-breakthrough', 'Engineers Develop New Method for Storing Renewable Energy', 'Engineers have announced a promising new method to store surplus renewable energy...', 'Engineers have announced a promising new method to store surplus renewable energy using high density salt based batteries. This approach could make renewable sources more stable and reduce reliance on fossil fuel backups. A prototype will undergo field testing later this year.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(11, 'winter-festival-returns', 'Annual Winter Festival Returns With New Attractions', 'The city\'s winter festival is back with expanded programming...', 'The city\'s winter festival is back with expanded programming including ice sculptures, cultural showcases, local food stalls, and a lantern parade. Organizers expect record attendance due to renewed public interest in outdoor seasonal events.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(12, 'healthcare-ai-tool', 'New AI Tool Helps Physicians Detect Early Stage Conditions', 'A new AI diagnostic tool is showing promise in early stage detection...', 'A new AI diagnostic tool is showing promise in early stage detection of a range of conditions. The system analyzes patient scans and alerts physicians to subtle abnormalities. Hospitals participating in the pilot project report increased accuracy and faster turnaround times.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(13, 'housing-study-released', 'Housing Affordability Study Shows Shifting Trends', 'A recent affordability study suggests that mid sized cities are becoming the new housing hotspots...', 'A recent affordability study suggests that mid sized cities are becoming the new housing hotspots due to a combination of remote work, rising downtown prices, and improved transit options. Economists say this trend is reshaping rental demands and influencing regional planning.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(14, 'science-museum-reopens', 'Science Museum Reopens After Major Renovation', 'The national science museum has reopened with a redesigned interactive exhibit hall...', 'The national science museum has reopened with a redesigned interactive exhibit hall, updated planetarium, and hands on learning stations. Families and educators say the redesign offers more inclusive and immersive educational experiences for visitors of all ages.', 0, '2025-11-13 00:26:23', '2025-11-13 00:26:23'),
(15, 'sports-analytics-advances', 'Sports Teams Turn to Advanced Analytics for Performance Gains', 'Professional teams are relying more heavily on analytics to guide training plans...', 'Professional teams are relying more heavily on analytics to guide training plans, optimize player rotations, and monitor fatigue. Coaches say the data driven insights help prevent injuries and improve game strategy. Fans may soon see real time metrics integrated into broadcasts.', 1, '2025-11-13 00:26:23', '2025-11-13 00:26:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `created_at`, `updated_at`) VALUES
-- Password: test123
(1, 'yoda@theforce.org', '$2y$10$Mn7dex0cUuCNvPiUkGQeG.OF8qvaH1c5E9KHxSZAW5CTRouRixTrO', '2025-11-13 00:14:39', '2025-11-13 00:14:39'),
-- Password: hello123
(2, 'rey@theforce.org', '$2y$10$47jfVnO7XEFqF/YcL/qGEu1WyT0E8TXMWIUqTr6BDE8/bvnNVbDBi', '2025-11-13 00:14:39', '2025-11-13 00:14:39'),
-- Password: password
(3, 'leia@rebellion.org', '$2y$10$BMSnVya5lpk8R0mkS9A5S.ip3zymXFxk4PYNKdyvIHrJ2vWYsoIxW', '2025-11-13 00:14:39', '2025-11-13 00:14:39'),
-- Password: mypwd
(4, 'luke@theforce.org', '$2y$10$UlmeCG1LGe59DgUbQX8/0ePIHxIEsEWmqNanNMgcyVZzjx7rWwsu.', '2025-11-13 00:14:39', '2025-11-13 00:14:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`a_id`),
  ADD UNIQUE KEY `uq_articles_slug` (`a_slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `a_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
