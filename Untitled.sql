CREATE TABLE `outil` (
  `id_outil` integer PRIMARY KEY,
  `nom` varchar(255),
  `catégorie` varchar(255),
  `lien` varchar(255)
);

CREATE TABLE `methodologie` (
  `id_methodologie` integer PRIMARY KEY,
  `nom` varchar(255),
  `description` varchar(255),
  `usage` varchar(255)
);

CREATE TABLE `composant` (
  `id_composant` integer PRIMARY KEY,
  `nom` varchar(255),
  `code` varchar(255),
  `exemple` varchar(255)
);

CREATE TABLE `outil_methodologie` (
  `id_outil` integer,
  `id_methodologie` integer
);

CREATE TABLE `composant_methodologie` (
  `id_composant` integer,
  `id_methodologie` integer
);

ALTER TABLE `composant_methodologie` ADD FOREIGN KEY (`id_composant`) REFERENCES `composant` (`id_composant`);

ALTER TABLE `composant_methodologie` ADD FOREIGN KEY (`id_methodologie`) REFERENCES `methodologie` (`id_methodologie`);

ALTER TABLE `outil_methodologie` ADD FOREIGN KEY (`id_outil`) REFERENCES `outil` (`id_outil`);

ALTER TABLE `outil_methodologie` ADD FOREIGN KEY (`id_methodologie`) REFERENCES `methodologie` (`id_methodologie`);
