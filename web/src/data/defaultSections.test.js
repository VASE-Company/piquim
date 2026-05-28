import test from 'node:test';
import assert from 'node:assert/strict';
import { PIQUIM_ABOUT_SECTIONS } from './defaultSections.js';

test('PIQUIM_ABOUT_SECTIONS has standard About sections instead of PiquimHero/PiquimTresMundos', () => {
    const types = PIQUIM_ABOUT_SECTIONS.map((section) => section.type);
    assert.deepEqual(types, [
        'AboutHero',
        'AboutMission',
        'AboutStats',
        'AboutValues',
        'AboutTeam',
        'AboutCTA'
    ]);
});
