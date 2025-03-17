"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const books = [];

        books.push({
            id: 1,
            title: "Harry Potter and the Philosopher's Stone",
            description:
                "The first novel in the Harry Potter series follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            published_date: "1997-06-26",
            author_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 2,
            title: "Harry Potter and the Chamber of Secrets",
            description:
                "The second novel in the Harry Potter series, following Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of attacks are perpetrated on students by a mysterious entity.",
            published_date: "1998-07-02",
            author_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 3,
            title: "Harry Potter and the Prisoner of Azkaban",
            description:
                "The third novel in the Harry Potter series follows Harry in his third year at Hogwarts, as he is informed that a prisoner named Sirius Black has escaped from Azkaban and intends to kill him.",
            published_date: "1999-07-08",
            author_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // George Orwell books
        books.push({
            id: 4,
            title: "1984",
            description:
                "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives. The protagonist, Winston Smith, begins a forbidden love affair with Julia, which leads to his eventual capture and torture by the Party's thought police.",
            published_date: "1949-06-08",
            author_id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 5,
            title: "Animal Farm",
            description:
                "An allegorical novella reflecting events leading up to the Russian Revolution of 1917 and then on into the Stalinist era of the Soviet Union. The book portrays a farm where the animals overthrow their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
            published_date: "1945-08-17",
            author_id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // J.R.R. Tolkien books
        books.push({
            id: 6,
            title: "The Hobbit",
            description:
                "A children's fantasy novel set in Middle-earth that follows the quest of home-loving Bilbo Baggins, the titular hobbit, to win a share of the treasure guarded by Smaug the dragon.",
            published_date: "1937-09-21",
            author_id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 7,
            title: "The Lord of the Rings",
            description:
                "An epic high-fantasy novel set in Middle-earth. The story begins as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work. It follows the quest of the hobbit Frodo Baggins to destroy the One Ring, which had been created by the Dark Lord Sauron.",
            published_date: "1954-07-29",
            author_id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 8,
            title: "The Silmarillion",
            description:
                "A collection of mythopoeic stories that forms a complete history of Middle-earth from its creation to the events described in The Lord of the Rings. It was published posthumously by Tolkien's son Christopher with assistance from Guy Gavriel Kay.",
            published_date: "1977-09-15",
            author_id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Jane Austen books
        books.push({
            id: 9,
            title: "Pride and Prejudice",
            description:
                "A romantic novel of manners following the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
            published_date: "1813-01-28",
            author_id: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 10,
            title: "Sense and Sensibility",
            description:
                "A novel that follows the Dashwood sisters, Elinor and Marianne, as they move with their widowed mother from their family home to a new home on a distant relative's property, where they experience love, romance, and heartbreak.",
            published_date: "1811-10-30",
            author_id: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Ernest Hemingway books
        books.push({
            id: 11,
            title: "The Old Man and the Sea",
            description:
                "A short novel about an aging Cuban fisherman, Santiago, and his struggle with a giant marlin far out in the Gulf Stream. The work won the Pulitzer Prize for Fiction in 1953 and contributed to Hemingway's selection for the Nobel Prize in Literature in 1954.",
            published_date: "1952-09-01",
            author_id: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 12,
            title: "A Farewell to Arms",
            description:
                "A novel set during the Italian campaign of World War I, narrated by Lieutenant Frederic Henry, an American paramedic serving in the Italian Army. The novel is a first-person account of American Frederic Henry, serving as a Lieutenant in the ambulance corps of the Italian Army.",
            published_date: "1929-09-27",
            author_id: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Agatha Christie books
        books.push({
            id: 13,
            title: "Murder on the Orient Express",
            description:
                "A detective novel featuring Belgian detective Hercule Poirot. The story revolves around a murder that occurred on the Orient Express train and Poirot's investigation to solve the murder case.",
            published_date: "1934-01-01",
            author_id: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 14,
            title: "Death on the Nile",
            description:
                "A murder mystery novel featuring the Belgian detective Hercule Poirot. On a tranquil cruise along the Nile, a wealthy heiress is murdered and Poirot must find the killer before another tragedy occurs.",
            published_date: "1937-11-01",
            author_id: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Stephen King books
        books.push({
            id: 15,
            title: "The Shining",
            description:
                "A horror novel that follows Jack Torrance, his wife Wendy, and their five-year-old son Danny when they move into the Overlook Hotel in the Colorado Rockies. Jack has been hired as the winter caretaker of the isolated hotel, and as the harsh winter weather sets in, the hotel's dark past begins to affect the family in terrifically frightening ways.",
            published_date: "1977-01-28",
            author_id: 7,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 16,
            title: "It",
            description:
                "A horror novel that follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. The novel deals with themes which would eventually become King staples: the power of memory, childhood trauma, and the ugliness lurking behind a façade of traditional small-town values.",
            published_date: "1986-09-15",
            author_id: 7,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Virginia Woolf books
        books.push({
            id: 17,
            title: "Mrs. Dalloway",
            description:
                'A novel that details a day in the life of Clarissa Dalloway, a fictional high-society woman in post-First World War England. Created from two short stories, "Mrs Dalloway in Bond Street" and the unfinished "The Prime Minister," the novel addresses Clarissa\'s preparations for a party she will host that evening.',
            published_date: "1925-05-14",
            author_id: 8,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 18,
            title: "To the Lighthouse",
            description:
                "A novel that follows the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920. The novel includes little dialogue and almost no action; most of it is written as thoughts and observations.",
            published_date: "1927-05-05",
            author_id: 8,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Mark Twain books
        books.push({
            id: 19,
            title: "The Adventures of Tom Sawyer",
            description:
                "A novel about a boy growing up along the Mississippi River. The story is set in the fictional town of St. Petersburg, inspired by Hannibal, Missouri, where Twain lived. Tom Sawyer lives with his Aunt Polly and his half-brother Sid. He skips school to swim and is made to whitewash the fence the next day as punishment.",
            published_date: "1876-12-01",
            author_id: 9,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 20,
            title: "Adventures of Huckleberry Finn",
            description:
                "A novel that is commonly known as one of the Great American Novels and a sequel to The Adventures of Tom Sawyer. It follows Huck Finn and his friend Tom Sawyer as they are growing up along the Mississippi River with their respective guardians.",
            published_date: "1884-12-10",
            author_id: 9,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Franz Kafka books
        books.push({
            id: 21,
            title: "The Metamorphosis",
            description:
                "A novella written by Franz Kafka which was first published in 1915. One of Kafka's best-known works, The Metamorphosis tells the story of salesman Gregor Samsa who wakes one morning to find himself inexplicably transformed into a huge insect and subsequently struggles to adjust to this new condition.",
            published_date: "1915-10-15",
            author_id: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 22,
            title: "The Trial",
            description:
                "A novel written by Franz Kafka between 1914 and 1915 and published posthumously in 1925. It tells the story of Josef K., a bank clerk who is arrested and prosecuted by a remote authority without having done anything wrong.",
            published_date: "1925-04-26",
            author_id: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Fyodor Dostoevsky books
        books.push({
            id: 23,
            title: "Crime and Punishment",
            description:
                "A novel that focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money. Before the killing, Raskolnikov believes that with the money he could liberate himself from poverty and go on to perform great deeds.",
            published_date: "1866-01-01",
            author_id: 11,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 24,
            title: "The Brothers Karamazov",
            description:
                "The final novel by the Russian author, which was completed in November 1880, just a few months before Dostoevsky's death. It is a passionate philosophical novel that enters deeply into questions of God, free will, and morality.",
            published_date: "1880-11-01",
            author_id: 11,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Gabriel García Márquez books
        books.push({
            id: 25,
            title: "One Hundred Years of Solitude",
            description:
                "A landmark novel that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel is often cited as one of the supreme achievements in literature.",
            published_date: "1967-05-30",
            author_id: 12,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 26,
            title: "Love in the Time of Cholera",
            description:
                "A novel that examines the romantic love of teenagers Florentino Ariza and Fermina Daza, which is stifled by Fermina's father's opposition and Florentino's status as a telegraph operator and poet, not a doctor or businessman.",
            published_date: "1985-01-01",
            author_id: 12,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Haruki Murakami books
        books.push({
            id: 27,
            title: "Norwegian Wood",
            description:
                "A novel that takes place in Tokyo during the late 1960s, at a time when Japanese students, like those of many other nations, were protesting against the established order. While it serves as the backdrop against which the events of the novel unfold, Murakami rarely directly addresses the student movement.",
            published_date: "1987-09-04",
            author_id: 13,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 28,
            title: "Kafka on the Shore",
            description:
                "A novel that follows two distinct narrative arcs that intersect over the course of the story. The odd-numbered chapters tell the story of 15-year-old Kafka Tamura, who runs away from home to escape an Oedipal curse and find his long-missing mother and sister. The even-numbered chapters tell the story of Nakata, an elderly man who lost his ability to read and write after a childhood accident.",
            published_date: "2002-09-12",
            author_id: 13,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 29,
            title: "1Q84",
            description:
                'A novel that tells the story of Aomame, a woman who notices strange changes occurring in the world in 1984. She is drawn into a plot involving a religious cult and an unusual girl named Fuka-Eri, who claims to be able to communicate with a race of beings known as "Little People."',
            published_date: "2009-05-29",
            author_id: 13,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Margaret Atwood books
        books.push({
            id: 30,
            title: "The Handmaid's Tale",
            description:
                "A dystopian novel set in a near-future New England, in a strongly patriarchal, totalitarian theonomic state known as the Republic of Gilead, which has overthrown the United States government.",
            published_date: "1985-06-01",
            author_id: 14,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 31,
            title: "The Testaments",
            description:
                "A sequel to The Handmaid's Tale, set 15 years after the events of the first novel. The novel is narrated by Aunt Lydia, a character from the previous novel; Agnes, a young woman living in Gilead; and Daisy, a young woman living in Canada.",
            published_date: "2019-09-10",
            author_id: 14,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Chinua Achebe books
        books.push({
            id: 32,
            title: "Things Fall Apart",
            description:
                "A novel that chronicles pre-colonial life in southeastern Nigeria and the arrival of Europeans during the late 19th century. It is seen as the archetypal modern African novel in English, and one of the first to receive global critical acclaim.",
            published_date: "1958-01-01",
            author_id: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        books.push({
            id: 33,
            title: "No Longer at Ease",
            description:
                "A novel that follows the story of Obi Okonkwo, the grandson of Okonkwo, the protagonist of Things Fall Apart. Obi returns to Nigeria after being educated in England and struggles to adapt to a lifestyle that conflicts with his own.",
            published_date: "1960-01-01",
            author_id: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return queryInterface.bulkInsert("Books", books);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
