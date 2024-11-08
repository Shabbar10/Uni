from collections import Counter


class Constant:
    def __init__(self, expr: str):
        self.value = expr

    def getClassName(self):
        return "constant"


class Variable:
    def __init__(self, expr : str):
        self.value = expr

    def getClassName(self):
        return "variable"


class Relation:
    def __init__(self, args):
        self.args = args

    def getArgs(self):
        for arg in self.args:
            if isinstance(arg, Constant) or isinstance(arg, Variable):
                print(arg.value, end="\t")
            else:
                print(arg, end="\t")

    def totalArgs(self):
        return len(self.args)

    def getPredicate(self):
        for arg in self.args:
            if not isinstance(arg, Constant) or not isinstance(arg, Variable):
                return arg

    def getVariables(self):
        variables = []
        for arg in self.args:
            if isinstance(arg, Variable):
                variables.append(arg.value)

        return variables


    def getConstants(self):
        constants = []
        for arg in self.args:
            if isinstance(arg, Constant):
                constants.append(arg.value)

        return constants

    def getArguments(self):
        notPredicate = []
        for arg in self.args:
            if isinstance(arg, Variable) or isinstance(arg, Constant):
                notPredicate.append(arg)

        return notPredicate


def unifier(r1 : Relation, r2 : Relation):
    unification = {}

    try:

        # print("Arguments of relation 1 : ")
        # print("\nArguments of relation 2 : ")
        # args1 = r1.getArgs()
        # args2 = r2.getArgs()


        predicate1 = r1.getPredicate()
        predicate2 = r2.getPredicate()

        var1 = r1.getVariables()
        count1 = Counter(var1)

        var2 = r2.getVariables()
        count2 = Counter(var2)

        const1 = r1.getConstants()
        const2 = r2.getConstants()



        # Checking duplicate variables in both relations
        dup1 = [item for item, freq in count1.items() if freq > 1]
        dup2 = [item for item, freq in count2.items() if freq > 1]

        if predicate1 != predicate2:
            raise Exception("Predicates do not match. Cannot find a unifier\n")

        if r1.totalArgs() != r2.totalArgs():
            raise Exception("No. of arguments do not match. Cannot find an unifier\n")

        # if len(dup1) > 0 or len(dup2) > 0:
        #     raise Exception("Same variables found in either of the expressions. Cannot find an unifier\n")


        arg1 = r1.getArguments()
        arg2 = r2.getArguments()


        for i in arg1:
            for j in arg2:
                if isinstance(i, Variable) and i.value in var2:
                    raise Exception("Identical variables found in expressions. Cannot find an unifier\n");
            if isinstance(j, Variable) and j.value in var1:
                raise Exception("Identical variables found in expressions. Cannot find an unifier\n");


        for i in range(len(arg1)):
            if arg1[i].value == arg2[i].value:
                continue
            elif isinstance(arg1[i], Variable):
                if isinstance(arg2[i], Variable):
                    print("Mismatch variables")
                elif arg1[i].value in [x.value for x in arg2]:
                    continue
                else:
                    unification[arg2[i].value] = arg1[i].value
            elif isinstance(arg2[i], Variable):
                if isinstance(arg1[i], Variable):
                    print("Mismatch variables")
                elif arg2[i].value in [x.value for x in arg1]:
                    continue
                else:
                    unification[arg1[i].value] = arg2[i].value
            else:
                print("MISMATCH")




        return unification



    except Exception as e:
        print("\nERROR : ", e)
    finally:
        return unification




def main():
    # Pass the relation as a form of array, with the first value being the predicate
    # Such as Knows(x, John) => [Knows, Variable("x"), Constant("John")]


    relation1 = Relation(["Knows", Constant("Raj"), Variable("X")])
    relation2 = Relation(["Knows", Variable("Y"), Constant("Seeta")])

    # Does not work for nested relations like the one given below

    # relation1 = Relation(["Knows", Constant("Raj"), Variable("X")])
    # relation2 = Relation(["Knows", Variable("Y"), Relation(["Sister", Variable("Y")])])

    unification = unifier(relation1, relation2)
    print(unification)



main()
