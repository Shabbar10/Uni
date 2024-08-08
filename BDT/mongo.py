from pymongo import MongoClient

client = MongoClient("localhost", 27017)

db = client["Connector"]
coll = db["connect"]

choice = 0

while choice != 6:
    choice = int(
        input(
            "Choose an operation:\n1. Insert\n2. Display all\n3. Search\n4. Update\n5. Delete\n6. Exit\n\n>> "
        )
    )

    match choice:
        case 1:
            doc = {}
            again = "y"
            while again == "y":
                field = input("Enter field name: ")
                value = input("Enter value: ")

                doc[field] = value

                again = input("Again? ")

            ack = coll.insert_one(doc)
            print(ack.acknowledged, "\n")

        case 2:
            all = coll.find()
            for each in all:
                print(each, "\n")

        case 3:
            field = input("Enter field name: ")
            value = input("Enter value: ")

            result = coll.find_one({field: value})
            print(result, "\n")

        case 4:
            field = input("Enter field name: ")
            value = input("Enter value: ")

            new_field = input("Enter new field: ")
            new_value = input("Enter new value: ")

            query_filter = {field: value}
            update_op = {"$set": {new_field: new_value}}

            result = coll.update_one(query_filter, update_op)
            print(result.acknowledged, "\n")

        case 5:
            field = input("Enter field name: ")
            value = input("Enter value: ")

            query_filter = {field: value}

            result = coll.delete_one(query_filter)
            print(result.deleted_count)
            print(result.acknowledged, "\n")

        case 6:
            print("Exiting. Good ebening\n")
        case _:
            print("Wrong!")

client.close()
