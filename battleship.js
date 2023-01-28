prime_req = ["Strength", "Intelligence", "Dexterity"]
classes = {
    fighter: {
        req: 'none',
        prime_req: prime_req[0],
        hit_dice: '1d8',
        max_level: 14,
        armour: 'Any',
        weapons: 'any',
        languages: ['Alignment', 'Common'],
        levels: {
            1: 0,
            2: 2000,
            3: 4000,
            4: 8000,
            5: 16000,
            6: 32000,
            7: 64000,
            8: 120000,
            9: 240000,
            10: 360000,
            11: 480000,
            12: 600000,
            13: 720000,
            14: 840000,
        }

    },
    magic_user: {
        req: 'Harry Potter',
        prime_req: prime_req[1],
        hit_dice: '1d4',
        max_level: 14,
        armour: 'None',
        weapons: 'Dagger',
        languages: ['Alignment', 'Common'],
        levels: {
            1: 0,
            2: 2000,
            3: 4000,
            4: 8000,
            5: 16000,
            6: 32000,
            7: 64000,
            8: 120000,
            9: 240000,
            10: 360000,
            11: 480000,
            12: 600000,
            13: 720000,
            14: 840000,
        }
    },
    thief: {
        req: 'none',
        prime_req: prime_req[2],
        hit_dice: '1d4',
        max_level: 14,
        armour: 'Leather, no shields',
        weapons: 'Any',
        languages: ['Alignment', 'Common'],
        levels: {
            1: 0,
            2: 2000,
            3: 4000,
            4: 8000,
            5: 16000,
            6: 32000,
            7: 64000,
            8: 120000,
            9: 240000,
            10: 360000,
            11: 480000,
            12: 600000,
            13: 720000,
            14: 840000,
        }

    }
}

x = {
    name: "Tammy",
    class: '',
    level: 1,
    xp: 100,
    ability_score: {
        strength: 3,
        intelligence: 3,
        wisdom: 3,
        dexterity: 3,
        constitution: 3,
        charisma: 3
    },
    alignment: "Lawful Good",
    hit_points: 500,
}

function main() {
    let STATE = 0;


}