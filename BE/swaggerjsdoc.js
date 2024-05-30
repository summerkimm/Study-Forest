/**
 * @swagger
 * /studies/{studyId}/user:
 *   post:
 *     summary: "Check password for accessing study"
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "The UUID of the study to check password for"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "qlalfqjsgh1234"
 *     responses:
 *       200:
 *         description: "Password checked successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "비밀번호가 일치합니다."
 */

/**
 * @swagger
 * /studies:
 *   get:
 *     summary: 스터디 전체조회
 *     tags: [Study]
 *     description: 전체 게시글을 조회한다.
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: 넘기고 싶은 데이터 갯수
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 가져오고 싶은 데이터 갯수
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색할 스터디 이름(name)
 *       - in: query
 *         name: view
 *         schema:
 *           type: string
 *           enum:
 *             - highPoint
 *             - lowPoint
 *             - newest
 *             - oldest
 *         description: 데이터 조회 방법
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: uuid
 *                       name:
 *                         type: string
 *                         example: "UX 스터디"
 *                       nickName:
 *                         type: string
 *                         example: "title in here"
 *                       description:
 *                         type: string
 *                         example: "Slow And Steady Wins The Race!!"
 *                       studyDays:
 *                         type: integer
 *                         example: 62
 *                       background:
 *                         type: string
 *                         example: "sky-blue"
 *                       points:
 *                         type: integer
 *                         example: 310
 *                       topReactions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 27
 *                             emoji:
 *                               type: string
 *                               example: "👩🏻"
 *                             count:
 *                               type: integer
 *                               example: 37
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentOffset:
 *                       type: integer
 *                       example: 1
 *                     nextOffset:
 *                       type: integer
 *                       example: 3
 *                     limit:
 *                       type: integer
 *                       example: 2
 */

/**
 * @swagger
 * /studies:
 *   post:
 *     summary: "Create a new study"
 *     tags: [Study]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "개발 공장"
 *               nickName:
 *                 type: string
 *                 example: "연우"
 *               description:
 *                 type: string
 *                 example: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
 *               background:
 *                 type: string
 *                 example: "sky_blue"
 *               password:
 *                 type: string
 *                 example: "qlalfqjsgh1234"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 129
 *                 name:
 *                   type: string
 *                   example: "개발 공장"
 *                 nickName:
 *                   type: string
 *                   example: "연우"
 *                 description:
 *                   type: string
 *                   example: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
 *                 background:
 *                   type: string
 *                   example: "green"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T08:00:09.135025Z"
 *                 topReactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *                 points:
 *                   type: integer
 *                   example: 0
 *                 habitTrackers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 */

/**
 * @swagger
 * /studies/{studyId}:
 *   get:
 *     summary: "Retrieve a study by ID"
 *     tags: [Study]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to retrieve"
 *     responses:
 *       200:
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 129
 *                 name:
 *                   type: string
 *                   example: "개발 공장"
 *                 nickName:
 *                   type: string
 *                   example: "연우"
 *                 description:
 *                   type: string
 *                   example: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
 *                 studyDays:
 *                   type: integer
 *                   example: 62
 *                 topReactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 27
 *                       emoji:
 *                         type: string
 *                         example: "👩🏻"
 *                       count:
 *                         type: integer
 *                         example: 37
 *                 points:
 *                   type: integer
 *                   example: 50
 *                 habitTrackers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "미라클모닝 6시 기상"
 *                       isCompleted:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - "Mon"
 *                           - "Tue"
 *                           - "Thu"
 *                           - "Sat"
 *                           - "Sun"
 */

/**
 * @swagger
 * /studies/{studyId}:
 *   delete:
 *     summary: "Delete a study by ID"
 *     tags: [Study]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to delete"
 *     responses:
 *       204:
 *         description: "Study deleted successfully"
 *       404:
 *         description: "Study not found"
 *       500:
 *         description: "Internal server error"
 */

/**
 * @swagger
 * /studies/{studyID}:
 *   patch:
 *     summary: "Update a study's nickname by ID"
 *     tags: [Study]
 *     parameters:
 *       - in: path
 *         name: studyID
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to update"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickName:
 *                 type: string
 *                 example: "와칭이"
 *     responses:
 *       200:
 *         description: "Study nickname updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 129
 *                 name:
 *                   type: string
 *                   example: "영화 보기"
 *                 nickName:
 *                   type: string
 *                   example: "와칭이"
 *                 description:
 *                   type: string
 *                   example: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
 */
/**
 * @swagger
 * /studies/{studyId}/habit:
 *   get:
 *     summary: "Retrieve habits of a study by ID"
 *     tags: [Habit]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to retrieve habits for"
 *     responses:
 *       200:
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 129
 *                 name:
 *                   type: string
 *                   example: "개발 공장"
 *                 nickName:
 *                   type: string
 *                   example: "연우"
 *                 habits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "미라클모닝 6시 기상"
 *                       isCompleted:
 *                         type: boolean
 *                         example: true
 */
/**
 * @swagger
 * /studies/{studyId}/habit:
 *   post:
 *     summary: "Add a new habit to a study by ID"
 *     tags: [Habit]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to add a habit to"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "자바스크립트 딥다이브 스터디 책 1챕터 읽기"
 *     responses:
 *       201:
 *         description: "Habit added successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 129
 *                 name:
 *                   type: string
 *                   example: "개발 공장"
 *                 nickName:
 *                   type: string
 *                   example: "연우"
 *                 habits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "미라클모닝 6시 기상"
 *                       isCompleted:
 *                         type: boolean
 *                         example: true
 */
/**
 * @swagger
 * /api/habits/{habitId}:
 *   delete:
 *     summary: "Delete a habit by ID"
 *     tags: [Habit]
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the habit to delete"
 *     responses:
 *       204:
 *         description: "Habit deleted successfully"
 *       404:
 *         description: "Habit not found"
 *       500:
 *         description: "Internal server error"
 */
/**
 * @swagger
 * /api/habits/{habitId}:
 *   patch:
 *     summary: "Update a habit by ID"
 *     tags: [Habit]
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the habit to update"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *               name:
 *                 type: string
 *                 example: "New Habit Name"
 *     responses:
 *       200:
 *         description: "Habit updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 name:
 *                   type: string
 *                   example: "스트레칭"
 *                 isCompleted:
 *                   type: boolean
 *                   example: true
 *                 changedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T02:24:43.025519Z"
 */
/**
 * @swagger
 * /{studyId}/points:
 *   post:
 *     summary: "Add additional points to a study"
 *     tags: [Point]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to add points to"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               additionalPoints:
 *                 type: integer
 *                 example: 19
 *     responses:
 *       200:
 *         description: "Points added successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "녜녜"
 *                 points:
 *                   type: integer
 *                   example: 219
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T02:24:43.025519Z"
 */
/**
 * @swagger
 * /api/{studyId}/reactions:
 *   post:
 *     summary: "Add reaction to a study"
 *     tags: [Reaction]
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the study to add reaction to"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emoji:
 *                 type: string
 *                 example: "🥰"
 *               type:
 *                 type: string
 *                 enum: ["increase", "decrease"]
 *                 example: "increase"
 *     responses:
 *       201:
 *         description: "Reaction added successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 24
 *                 studyId:
 *                   type: integer
 *                   example: 2
 *                 emoji:
 *                   type: string
 *                   example: "🥰"
 *                 count:
 *                   type: integer
 *                   example: 8
 */
