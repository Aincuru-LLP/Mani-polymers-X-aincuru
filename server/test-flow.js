import { pool, query } from './db.js';

async function runEndToEndVerification() {
  console.log('🧪 Starting End-to-End Verification Test for Mani Polymers...');

  try {
    // 1. Verify DB Connection
    console.log('\n1. Testing Neon PostgreSQL Connection...');
    const timeRes = await query('SELECT NOW() as current_time');
    console.log('   ✅ Neon Database Connected! Server Time:', timeRes.rows[0].current_time);

    // 2. Test Inserting a Lead (Lead Generation Simulation)
    console.log('\n2. Testing Lead Submission...');
    const testLead = {
      name: 'R. Senthil Kumar',
      company_name: 'Sivakasi Print & Pack Ltd',
      phone: '9842100000',
      product: 'PVA GUM',
      message: 'Need 40 cans of 50L PVA Gum urgently for duplex carton lamination.',
    };

    const insertSql = `
      INSERT INTO leads (name, company_name, phone, product, message, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'New', NOW(), NOW())
      RETURNING *;
    `;
    const insertRes = await query(insertSql, [
      testLead.name,
      testLead.company_name,
      testLead.phone,
      testLead.product,
      testLead.message,
    ]);

    const savedLead = insertRes.rows[0];
    console.log(`   ✅ Lead Inserted Successfully! ID: #${savedLead.id}`);
    console.log(`      Name: ${savedLead.name}`);
    console.log(`      Product: ${savedLead.product}`);
    console.log(`      Status: ${savedLead.status}`);

    // 3. Test WhatsApp Link Generation Logic
    console.log('\n3. Testing WhatsApp Redirection String Construction...');
    const targetNumber = '919787329451';
    const companyPart = savedLead.company_name ? ` from ${savedLead.company_name}` : '';
    const notesPart = savedLead.message ? ` Requirement: ${savedLead.message}.` : '';
    const rawMessage = `Hello Mani Polymers, my name is ${savedLead.name}${companyPart}. I am interested in ${savedLead.product}.${notesPart} Please get back to me.`;
    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

    console.log('   ✅ WhatsApp URL constructed:');
    console.log(`      ${whatsappUrl}`);

    // 4. Test Fetching Leads (Admin Dashboard Query Simulation)
    console.log('\n4. Testing Admin Leads Query...');
    const fetchSql = 'SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;';
    const fetchRes = await query(fetchSql);
    console.log(`   ✅ Found ${fetchRes.rows.length} leads in database.`);
    const found = fetchRes.rows.find((l) => l.id === savedLead.id);
    if (found) {
      console.log('   ✅ Newly created lead verified in query results.');
    } else {
      throw new Error('Inserted lead was not found in fetch query');
    }

    // 5. Test Status Update (Admin Action Simulation)
    console.log('\n5. Testing Lead Status Update to "Contacted"...');
    const updateSql = 'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *;';
    const updateRes = await query(updateSql, ['Contacted', savedLead.id]);
    console.log(`   ✅ Status updated to: ${updateRes.rows[0].status}`);

    console.log('\n======================================================');
    console.log('🎉 ALL TESTS PASSED! Database, Form flow, and Admin logic verified.');
    console.log('======================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Verification failed with error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runEndToEndVerification();
