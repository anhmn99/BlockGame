// TODO: Adjust correct starting position and rotation of pieces
// Possible todo: replay saving

let pieces = [
    [0, 0, 0, 0,
     1, 1, 1, 1,
     0, 0, 0, 0,
     0, 0, 0, 0], // straight
    [0, 0, 0, 0,
     0, 2, 2, 0,
     0, 2, 2, 0,
     0, 0, 0, 0], // square
    [0, 0, 0, 0,
     3, 3, 3, 0,
     0, 3, 0, 0,
     0, 0, 0, 0], // T
    [0, 0, 0, 0,
     0, 4, 4, 0,
     4, 4, 0, 0,
     0, 0, 0, 0], // forward-snake
    [0, 0, 0, 0,
     5, 5, 0, 0,
     0, 5, 5, 0,
     0, 0, 0, 0], // backward-snake
    [0, 0, 0, 0,
     6, 6, 6, 0,
     0, 0, 6, 0,
     0, 0, 0, 0], // reverse-L
    [0, 0, 0, 0,
     7, 7, 7, 0,
     7, 0, 0, 0,
     0, 0, 0, 0] // L
];

class StandardGameState {

    constructor(settingsObject) {
        // TODO: Check for null, have default options available

        // All values hard-coded for now, for testing purposes.

        // Game "well" settings
        this.width = 10;
        this.height = 20;
        
        // Initialize well
        this.well = new Array(this.height * this.width).fill(0);
        this.currentPiece = null;
        this.heldPiece = null;

        // Assume piece previews will never show more than 10.
        this.nextPieces = this.generatePieceBag();

        this.lockDownSetting = null; // TODO: Support several

        // Game display settings that may need to be incorporated
        // into game state logic
        this.numberOfPiecesInPreview = 4;

        this.piecesCleared = 0;
        this.score = 0;
        this.gameLost = false;
        this.gameOver = false;
        this.winCheckFunction = () => {
            return (this.piecesCleared >= 40); 
        }; // clear 40 lines as default while we're still in dev stage

        this.frameUpdateListeners = [];

        // TODO: Allow winCheckFunction to change
    }

    generatePieceBag() {
        // Same kind of randomness as in CLRS book
        let order = [0, 1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 7; i++) {
            let rand = Math.floor(Math.random() * (7-i));
            let temp = order[rand];
            order[rand] = order[i];
            order[i] = temp;
        }

        return order;
    }

    generatePiece() {
        let currentPiece = this.nextPieces.shift();
        if (this.nextPieces.length < this.numberOfPiecesInPreview) {
            this.nextPieces.concat(this.generatePieceBag);
        }
        
        return currentPiece;
    }

    clearLines() {

    }

    calculateScore() {
        // Scores for singles, doubles, quadruples, t-spins, ...
    }

    moveLeft() {
        if (!this.isHorizontalCollision) {

        }
    }

    moveRight() {
        if (!this.isHorizontalCollision) {

        }
    }

    moveDown() {
        if (!this.isVerticalCollision) {

        }
    }

    softDrop() {

    }

    hardDrop() {

    }

    rotateLeft() {

    }

    rotateRight() {

    }

    checkKick() {

    }

    holdPiece() {
        // If no prior hold piece, then give player next piece
    }

    isHorizontalCollision() {

    }

    isVerticalCollision() {

    }

    placePiece() {

    }

    addFrameUpdateListener(listener) {
        this.frameUpdateListeners.push(listener);
    }

    triggerFrameUpdate() {
        // TODO: Allow view to attach handler to gameState,
        // so that it can update whenever something changes.
        for (let listener of this.frameUpdateListeners) {
            listener();
        }
    }

    // TODO: Garbage lines with invisible blocks
}

export default class StandardGameLoop {
    constructor(gameLoopSettings, gameStateSettings) {

        // Game-loop related settings, hard-coded for now.
        this.dropTime = 1000; // piece's drop time in milliseconds
        this.lockDelay = this.dropTime; // by default, for now 
        this.hardDropWaitTime = 0;
        this.onLineClearWaitTime = 0; 

        this.gameState = new StandardGameState(gameStateSettings);
        this.gameOver = false;
        this.timePlayed = 0;

        this.targetFPS = 60;

        this.currentInput = null;
    }

    startGame() {
        // Start game loop
        let timeBeforeDrop = this.dropTime;
        let timeBeforeLock = this.lockDelay;
        let lambda = 0.002 // margin of error for float calculations
        
        let interval = 1000 / this.targetFPS();
        let drift = 0;
        let expected = performance.now() + interval;
        setTimeout(() => {
            this.gameState.generatePiece();
        }, interval);
        while (!this.gameOver) {
            // TODO: Implement self-adjusting timer

            // Credit Bergi + Community on StackOverflow for
            // inspiration
            drift = performance.now() - expected;
            // TODO: Edge case for when drift is super large,
            // e.g. if someone clicks away from browser
            // and the game does not pause

            if (this.input === null) {
                // TODO: Check accuracy of this placement
                // of time decrement.
                timeBeforeDrop -= interval;
                if (timeBeforeDrop - lambda <= 0) {
                    this.gameState.moveDown();
                }
            } else if (this.input[0] == 'left') {
                // TODO: Handle these cases
            } else if (this.input[0] == 'right') {

            } else if (this.input[0] == 'down') {

            } else if (this.input[0] == 'hard_drop') {

            }

            if (this.gameState.gameOver) {
                break;
            }

            expected += interval;

            setTimeout(() => {}, Math.max(0, interval - drift));
        }
    }

    getInput(inputArray) {
        // TODO: Handle cases where multiple keys are pressed at once
        this.inputArray = inputArray;
    }
}