% Knowledge Base: Symptoms and Treatments
symptom('Flu').
symptom('Yellowish eyes and skin').
symptom('Dark color urine').
symptom('Pale bowel movement').
symptom('Fatigue').
symptom('Vomiting').
symptom('Fever').
symptom('Pain in joints').
symptom('Weakness').
symptom('Stomach Pain').

treatment('Flu', 'Drink hot water, avoid cold eatables.').
treatment('Yellowish eyes and skin', 'Put eye drops, have healthy sleep, do not strain your eyes.').
treatment('Dark color urine', 'Drink lots of water, juices and eat fruits. Avoid alcohol consumption.').
treatment('Pale bowel movement', 'Drink lots of water and exercise regularly.').
treatment('Fatigue', 'Drink lots of water, juices and eat fruits.').
treatment('Vomiting', 'Drink salt and water.').
treatment('Fever', 'Put hot water cloth on head and take crocin.').
treatment('Pain in joints', 'Apply pain killer and take crocin.').
treatment('Weakness', 'Drink salt and water, eat fruits.').
treatment('Stomach Pain', 'Avoid outside food and eat fruits.').

% User Interface
start :- 
    retractall(patient(_, _)),
    write('Welcome to the Liver Disease Diagnosis System'), nl,
    write('Please answer the following questions with yes or no.'), nl,
    ask_symptoms,
    output.

ask_symptoms :-
    symptom(X),
    format('Does the patient have ~w? (yes/no) ', [X]),
    read(Y),
    assert(patient(X, Y)),
    fail.
ask_symptoms.

% Diagnosis Rules
disease(hemochromatosis) :-
    patient('Stomach Pain', yes),
    patient('Pain in joints', yes),
    patient('Weakness', yes),
    patient('Dark color urine', yes),
    patient('Yellowish eyes and skin', yes).

disease(hepatitis_c) :-
    patient('Pain in joints', yes),
    patient('Fever', yes),
    patient('Fatigue', yes),
    patient('Vomiting', yes),
    patient('Pale bowel movement', yes).

disease(hepatitis_b) :-
    patient('Pale bowel movement', yes),
    patient('Dark color urine', yes),
    patient('Yellowish eyes and skin', yes).

disease(hepatitis_a) :-
    patient('Flu', yes),
    patient('Yellowish eyes and skin', yes).

disease(jaundice) :-
    patient('Yellowish eyes and skin', yes).

disease(flu) :-
    patient('Flu', yes).

% Output
output :- 
    nl, 
    possible_diseases, 
    nl, 
    advice,
    nl,
    write('Note: This is a basic diagnosis. Please consult a medical professional for accurate diagnosis and treatment.'), nl.

possible_diseases :- 
    findall(X, disease(X), Diseases),
    (   Diseases = []
    ->  write('No specific disease identified based on the symptoms provided.')
    ;   write('The patient may suffer from the following disease(s):'), nl,
        print_diseases(Diseases)
    ).

print_diseases([]).
print_diseases([H|T]) :-
    write('- '), write(H), nl,
    print_diseases(T).

advice :-
    write('Recommended treatments based on symptoms:'), nl,
    setof(Treatment, Symptom^(patient(Symptom, yes), treatment(Symptom, Treatment)), Treatments),
    print_treatments(Treatments).

print_treatments([]).
print_treatments([H|T]) :-
    write('- '), write(H), nl,
    print_treatments(T).

% Main query predicate
:- dynamic patient/2.
