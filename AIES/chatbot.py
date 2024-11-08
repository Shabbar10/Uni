from random import choice

import nltk
from nltk.chat.util import Chat, reflections

# Define your patterns and responses here
pairs = [
    [r"hello|hi|hey", ["Hello!", "Hey there!", "Hi!"]],
    [r"my name is (.*)", ["Hello %1, nice to meet you!"]],
    [
        r"(what is your name?|who are you?)",
        ["I am Mentos, your movie booking assistant!", "Call me Mentos."],
    ],
    [r"bye|goodbye|see you", ["Goodbye! Take care.", "See you soon!"]],
    [
        r".*\b(movie|movies|now playing|currently showing)\b.*",
        [
            "Here are the movies currently playing: Inception, Interstellar, Tenet, and The Dark Knight.",
            "We have Inception, Interstellar, and Tenet showing today.",
        ],
    ],
    [
        r".*\b(book|reserve|reservation|booking)\b.*",
        [
            "Sure, I can help with that. Let me know which movie, what time, and how many people.",
            "Great! I can help book your tickets. Just mention the movie, time, and number of people.",
        ],
    ],
    [
        r".*\b(what time|schedule|times|when)\b.*",
        [
            "You can find the movie schedules on our website.",
            "Movies are playing at various times today. Would you like to know about a specific movie?",
        ],
    ],
    [
        r".*\b(price|cost|ticket cost)\b.*",
        [
            "The ticket price is $12 for standard and $18 for premium seating.",
            "Tickets are priced at $12 for regular shows. For premium seats, it's $18.",
        ],
    ],
    [
        r".*\b(seats|seat availability|available seats)\b.*",
        [
            "Seats are filling up quickly! Would you like to check availability for a specific time?",
            "There are still some seats available. Let me know the movie and showtime to proceed.",
        ],
    ],
    [
        r".*\b(genre|genres|type of movie)\b.*",
        [
            "We have action, drama, comedy, thriller, and sci-fi movies available. Which genre would you prefer?",
            "What kind of movie are you looking for? We have action, comedy, and sci-fi.",
        ],
    ],
    [
        r".*\b(confirm|confirmation)\b.*",
        [
            "Your booking has been confirmed! You will receive the details via email shortly.",
            "Great! Your movie reservation is confirmed.",
        ],
    ],
    [
        r".*\b(theater|location|cinema)\b.*",
        [
            "Our theaters are located in the city center, next to the main mall.",
            "You can find our theaters in multiple locations across the city. Which one would you like to visit?",
        ],
    ],
    [
        r".*\b(cancel|cancellation)\b.*",
        [
            "To cancel your booking, please provide your booking ID.",
            "Sure, I can help with the cancellation. Can you share your booking ID, please?",
        ],
    ],
    [
        r".*\b(payment|pay|payment options)\b.*",
        [
            "We accept credit cards, PayPal, and mobile payments. Which would you like to use?",
            "You can pay with a credit card, PayPal, or Google Pay. Let me know your preference.",
        ],
    ],
    [
        r".*\b(recommend|suggest)\b.*(action|comedy|thriller|drama|sci-fi)\b.*",
        [
            "For action lovers, I recommend Inception or Mad Max: Fury Road.",
            "If you're into sci-fi, check out Interstellar or The Matrix.",
        ],
    ],
    [
        r".*\b(tickets for \d+ people|book for \d+)\b.*",
        [
            "Got it! I'll reserve seats for you. Just let me know the movie and showtime.",
            "No problem! Tell me the movie and time, and I'll book your tickets.",
        ],
    ],
    [
        r".*\b(help|assist|support)\b.*",
        [
            "I'm here to help! Ask me about movie times, booking, or anything else.",
            "How can I assist you today? Feel free to ask about booking, movies, or schedules.",
        ],
    ],
    [
        r".*\b(late|missed)\b.*",
        [
            "If you missed your show, don't worry! You can rebook for another time.",
            "Running late? I can help you reschedule your tickets for the next available show.",
        ],
    ],
    [
        r".*\b(discount|offers|promo)\b.*",
        [
            "We have a 10% discount on all tickets if you book before noon!",
            "Currently, we have a buy 1 get 1 free offer on premium seats for the weekend shows.",
        ],
    ],
]

# Create a chatbot instance with these pairs and reflections
chatbot = Chat(pairs, reflections)


# Main function to interact with the chatbot
def movie_chat():
    print(
        "Hi, I'm Mentos! How can I assist you with your movie booking today? (type 'quit' to exit)"
    )
    while True:
        user_input = input("You: ").lower()
        if user_input == "quit":
            print("Mentos: Goodbye! Have a great day.")
            break
        response = chatbot.respond(user_input)
        if response:
            print("Mentos:", response)
        else:
            print("Mentos: I'm sorry, I didn't quite catch that. Could you rephrase?")


# Start the chatbot
movie_chat()
