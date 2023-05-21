#!/usr/bin/env python
import math
import functools

class Monkey: 
    def __init__(self, starting_items=None, operation=None, test_condition=None, receiver_if_test_passed=None, receiver_if_test_failed=None, monkey_index=None):
        self.monkey_index = monkey_index
        self.starting_items = starting_items
        # self.received_items = []
        self.operation = operation
        self.test_condition = test_condition
        self.receiver_if_test_passed = receiver_if_test_passed
        self.receiver_if_test_failed = receiver_if_test_failed
        self.inspections = 0
    def inspect(self) -> str:
        self.inspections += 1
        return self.operation
    # def receive_item(self,item):
    #     self.received_items.append(item)
    # def get_all_items(self):
    #     return [*self.starting_items, *self.received_items]


def monkey_exchange(throwing_monkey: Monkey, catching_monkeys: list[Monkey], common_modulo: int):
    for item in throwing_monkey.starting_items:
        [first_operand, operator, second_operand] = throwing_monkey.inspect().replace("item", str(item)).split(" ")
        worry_level = eval(f"({first_operand}{operator}{second_operand})%{common_modulo}")
        test = worry_level == 0 or worry_level%throwing_monkey.test_condition == 0
            
        # print(first_operand, operator, second_operand, worry_level, throwing_monkey.test_condition, test, throwing_monkey.receiver_if_test_passed, throwing_monkey.receiver_if_test_failed)
        if test:
            catching_monkeys[throwing_monkey.receiver_if_test_passed].starting_items = [*catching_monkeys[throwing_monkey.receiver_if_test_passed].starting_items, worry_level]
        else:
            catching_monkeys[throwing_monkey.receiver_if_test_failed].starting_items = [*catching_monkeys[throwing_monkey.receiver_if_test_failed].starting_items, worry_level]
    throwing_monkey.starting_items = []

input: list[str] = open("./js/day11/input.txt", "r").read().split("\n\n")
monkeys: list[str] = list(map(lambda monkey : monkey.split("\n"), input))
striped_monkeys: list[str] = list(map(lambda monkey : list(map(lambda monkey_prop: monkey_prop.strip(), monkey)), monkeys))
print(striped_monkeys)

monkeys = []
for striped_monkey in striped_monkeys:
        monkey = Monkey()
        for monkey_prop in striped_monkey:
            if len(monkey_prop.split(": "))>1:
                [key, val] = monkey_prop.split(": ")
                if(key=="Starting items"):
                    monkey.starting_items = [int(value) for value in val.split(",")]
                elif(key == "Test"):
                    monkey.test_condition = int(val.replace("divisible by", ""))
                elif(key == "If true"):
                    monkey.receiver_if_test_passed = int(val.replace("throw to monkey",""))
                elif(key == "If false"):
                    monkey.receiver_if_test_failed = int(val.replace("throw to monkey",""))
                elif(key == "Operation"):
                    monkey.operation = val.replace("new = ", "").replace("old","item")
            else:
                monkey.monkey_index = int(monkey_prop.replace(":", "").replace("Monkey ", ""))
        monkeys.append(monkey)

divisors = []
for monkey in monkeys:
    divisors.append(monkey.test_condition)

common_modulo = functools.reduce(lambda x,y: x*y, divisors)

print(common_modulo)


rounds = 10000
for i in range(1,rounds+1):
    for monkey in monkeys:
            monkey_exchange(monkey, monkeys, common_modulo)

higher_inspections = []
for monkey in monkeys:
    higher_inspections.append(monkey.inspections)

higher_inspections.sort(reverse=True)
print(functools.reduce(lambda x,y: x*y,higher_inspections[0:2]))