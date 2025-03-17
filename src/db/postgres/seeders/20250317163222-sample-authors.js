"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const authors = [];
        authors.push({
            id: 1,
            name: "J.K. Rowling",
            biography:
                "British author born on July 31, 1965, in Yate, Gloucestershire, England. Best known for creating the Harry Potter fantasy series, which has sold over 500 million copies worldwide. Before her literary success, Rowling faced numerous hardships, including poverty and depression, and famously wrote the first Harry Potter book in Edinburgh cafés while struggling as a single mother.",
            date_of_birth: "1965-07-31",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 2,
            name: "George Orwell",
            biography:
                'English novelist, essayist, and critic born Eric Arthur Blair on June 25, 1903, in Motihari, Bengal, British India. His works, including the dystopian novels "Animal Farm" and "1984," are characterized by lucid prose, awareness of social injustice, opposition to totalitarianism, and commitment to democratic socialism. Orwell\'s influence on contemporary culture, particularly his warnings about the dangers of government overreach and mass surveillance, remains profound.',
            date_of_birth: "1903-06-25",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 3,
            name: "J.R.R. Tolkien",
            biography:
                'English writer, poet, philologist, and academic born on January 3, 1892, in Bloemfontein, South Africa. Best known for his high fantasy works "The Hobbit" and "The Lord of the Rings," Tolkien created an elaborate fictional universe with its own languages, histories, and mythologies. A professor at Oxford University, his scholarly work included a landmark lecture on "Beowulf" and translations of medieval works. Tolkien\'s influence on the fantasy genre is immeasurable, establishing many of the tropes and conventions that define modern fantasy literature.',
            date_of_birth: "1892-01-03",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 4,
            name: "Jane Austen",
            biography:
                'English novelist born on December 16, 1775, in Steventon, Hampshire, England. Known for her six major novels including "Pride and Prejudice" and "Sense and Sensibility," Austen\'s works critique the British landed gentry at the end of the 18th century and are noted for their wit, social commentary, and insights into the lives of women. Though she achieved little fame in her lifetime, her novels have rarely been out of print since her death and have inspired numerous adaptations across various media.',
            date_of_birth: "1775-12-16",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 5,
            name: "Ernest Hemingway",
            biography:
                'American novelist, short-story writer, and journalist born on July 21, 1899, in Oak Park, Illinois. Hemingway\'s economical and understated style—which he termed the iceberg theory—had a strong influence on 20th-century fiction. His adventurous lifestyle and his public image brought him admiration from later generations. Hemingway was awarded the Pulitzer Prize for Fiction in 1953 and the Nobel Prize in Literature in 1954. His notable works include "The Old Man and the Sea," "A Farewell to Arms," and "For Whom the Bell Tolls."',
            date_of_birth: "1899-07-21",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 6,
            name: "Agatha Christie",
            biography:
                'British writer born on September 15, 1890, in Torquay, Devon, England. Known as the "Queen of Mystery," Christie is best known for her 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple. Christie also wrote the world\'s longest-running play, "The Mousetrap," and six romances under the pseudonym Mary Westmacott. In 1971, she was made a Dame for her contribution to literature.',
            date_of_birth: "1890-09-15",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 7,
            name: "Stephen King",
            biography:
                'American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels born on September 21, 1947, in Portland, Maine. His books have sold more than 350 million copies worldwide, many of which have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books. Known for works like "The Shining," "It," "Carrie," and "The Stand," King\'s writing often features small-town settings with supernatural forces lurking beneath the surface.',
            date_of_birth: "1947-09-21",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 8,
            name: "Virginia Woolf",
            biography:
                'English writer born on January 25, 1882, in London, England. Considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. Woolf was a significant figure in London literary society and a central figure in the influential Bloomsbury Group of intellectuals. Her most famous works include the novels "Mrs. Dalloway," "To the Lighthouse," and "Orlando," as well as the long essay "A Room of One\'s Own."',
            date_of_birth: "1882-01-25",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 9,
            name: "Mark Twain",
            biography:
                'American writer, humorist, entrepreneur, publisher, and lecturer born Samuel Langhorne Clemens on November 30, 1835, in Florida, Missouri. Twain is best known for the classic American novels "The Adventures of Tom Sawyer" and "Adventures of Huckleberry Finn," the latter often called "The Great American Novel." His wit and satire, in prose and in speech, earned praise from critics and peers, and he was a friend to presidents, artists, industrialists, and European royalty.',
            date_of_birth: "1835-11-30",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 10,
            name: "Franz Kafka",
            biography:
                'German-speaking Bohemian novelist and short-story writer born on July 3, 1883, in Prague, Bohemia (now the Czech Republic). Regarded as one of the major figures of 20th-century literature, his work fuses elements of realism and the fantastic. It typically features isolated protagonists facing bizarre or surrealistic predicaments and incomprehensible socio-bureaucratic powers. His best-known works include the novella "The Metamorphosis" and novels "The Trial" and "The Castle."',
            date_of_birth: "1883-07-03",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 11,
            name: "Fyodor Dostoevsky",
            biography:
                'Russian novelist, short story writer, essayist, and journalist born on November 11, 1821, in Moscow, Russia. Dostoevsky\'s literary works explore human psychology in the troubled political, social, and spiritual atmospheres of 19th-century Russia. His most acclaimed novels include "Crime and Punishment," "The Idiot," "Demons," and "The Brothers Karamazov." These works have had a profound influence on intellectual history, from theology to psychoanalysis to modern existentialism.',
            date_of_birth: "1821-11-11",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 12,
            name: "Gabriel García Márquez",
            biography:
                'Colombian novelist, short-story writer, screenwriter, and journalist born on March 6, 1927, in Aracataca, Colombia. Considered one of the most significant authors of the 20th century and the main exponent of magical realism. García Márquez was awarded the Nobel Prize in Literature in 1982. His best-known work, "One Hundred Years of Solitude," has been translated into 37 languages and has sold more than 30 million copies. The novel chronicles the multi-generational Buendía family, whose patriarch founds the fictional town of Macondo.',
            date_of_birth: "1927-03-06",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 13,
            name: "Haruki Murakami",
            biography:
                'Japanese writer born on January 12, 1949, in Kyoto, Japan. His books and stories have been bestsellers in Japan and internationally, with his work translated into 50 languages and selling millions of copies. His notable works include "Norwegian Wood," "Kafka on the Shore," "The Wind-Up Bird Chronicle," and "1Q84." Murakami\'s fiction, often characterized by a surrealistic, melancholic mood, features elements of magical realism, references to Western culture, and themes of alienation and loneliness.',
            date_of_birth: "1949-01-12",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 14,
            name: "Margaret Atwood",
            biography:
                'Canadian poet, novelist, literary critic, essayist, teacher, environmental activist, and inventor born on November 18, 1939, in Ottawa, Ontario, Canada. Atwood is best known for her work addressing feminist and environmental themes, particularly in her dystopian novel "The Handmaid\'s Tale" and its sequel "The Testaments." She has published 18 novels, 11 non-fiction books, 9 collections of short stories, 8 children\'s books, and 2 graphic novels, as well as numerous volumes of poetry. Atwood has won numerous awards, including the Booker Prize twice, the Governor General\'s Award, the Franz Kafka Prize, and the National Book Critics Circle Award.',
            date_of_birth: "1939-11-18",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        authors.push({
            id: 15,
            name: "Chinua Achebe",
            biography:
                'Nigerian novelist, poet, professor, and critic born on November 16, 1930, in Ogidi, Nigeria. Widely regarded as the father of modern African literature, Achebe\'s first novel, "Things Fall Apart" (1958), is the most widely read book in modern African literature. The novel depicts the complex customs of the Igbo people and the disruptive effects of British colonialism in Nigeria. Achebe\'s later novels include "No Longer at Ease," "Arrow of God," "A Man of the People," and "Anthills of the Savannah."',
            date_of_birth: "1930-11-16",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return queryInterface.bulkInsert("Authors", authors);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Authors", null, {});
    },
};
